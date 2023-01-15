import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets'
import { MessagesService } from './messages.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { WebSocketServer } from '@nestjs/websockets/decorators/gateway-server.decorator'
import { Server, Socket } from 'socket.io'
import { ConnectedSocket } from '@nestjs/websockets/decorators/connected-socket.decorator'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server

  constructor (private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create (
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messagesService.create(createMessageDto, client)

    this.server.emit('newMessage', message)
    return message
  }

  @SubscribeMessage('findAllMessages')
  findAll () {
    console.log('calld')
    return this.messagesService.findAll()
  }

  @SubscribeMessage('findOneMessage')
  findOne (@MessageBody() id: string) {
    // TODO: implement searching

    return this.messagesService.findOne(id)
  }

  @SubscribeMessage('updateMessage')
  update (@MessageBody() updateMessageDto: UpdateMessageDto) {
    // TODO: implement updating

    return this.messagesService.update(updateMessageDto.id, updateMessageDto)
  }

  @SubscribeMessage('removeMessage')
  remove (@MessageBody() id: string) {
    return this.messagesService.remove(id)
  }
  @SubscribeMessage('join')
  joinRoom (
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    return this.messagesService.identify(name, client.id)
  }
  @SubscribeMessage('typing')
  async typing (
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = await this.messagesService.getClientByName(client.id)
    if (!name) return
    client.broadcast.emit('typing', { name, isTyping })
  }
}
