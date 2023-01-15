import { Injectable } from '@nestjs/common'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { Message } from './entities/message.entity'
import { WebSocketServer } from '@nestjs/websockets/decorators'
import { Server } from 'socket.io'
@Injectable()
export class MessagesService {
  messages: Message[] = [{ userName: 'Pepe', content: 'hola' }]
  clientToUser = {}
  create (createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto }
    this.messages.push(message)

    return message // TODO: IMPROVE
  }

  findAll () {
    return this.messages
  }

  findOne (id: number) {
    return `This action returns a #${id} message`
  }

  update (id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`
  }

  remove (id: number) {
    return `This action removes a #${id} message`
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
  async typing() {
    
  }
}
