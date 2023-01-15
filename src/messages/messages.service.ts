import { Injectable } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { Message } from './entities/message.entity'
import { WebSocketServer } from '@nestjs/websockets/decorators'
import { Server, Socket } from 'socket.io'
import { v4 as uuid } from 'uuid'
@Injectable()
export class MessagesService {
  messages: Message[] = [
    { userName: 'Pepe', content: 'hola', id: uuid(), author: uuid() },
  ]
  clientToUser = {}
  create (createMessageDto: Omit<CreateMessageDto, 'id'>, client: Socket) {
    const message = { ...createMessageDto, id: uuid(), author: client.id }
    this.messages.push(message)

    return message // TODO: IMPROVE
  }

  findAll () {
    return this.messages
  }

  findOne (id: string) {
    return `This action returns a #${id} message`
  }

  update (id: string, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`
  }

  remove (id: string) {
    const filteredMessages = this.messages.filter(message => message.id !== id)
    this.messages = filteredMessages
    return this.messages
  }

  identify (name: string, clientId: string) {
    this.clientToUser[clientId] = name
    return Object.values(this.clientToUser)
  }

  getClientByName (name: string) {
    return Object.values(this.clientToUser).find(
      userName => userName === name,
    )[0]
  }
  async typing () {}
}
