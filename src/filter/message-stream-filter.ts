import { FireStream } from '../firestream'
import { Sendable } from '../message/sendable'
import { SendableType } from '../types/sendable-types'

export class MessageStreamFilter {

    static bySendableType(...types: SendableType[]) {
        return (sendable: Sendable) => {
            for (const type of types) {
                if (sendable.getType() === type.get()) {
                    return true
                }
            }
            return false
        }
    }

    static notFromMe() {
        return (sendable: Sendable) => sendable.from !== FireStream.shared().currentUserId()
    }

}
