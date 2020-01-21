import { Keys } from '../firebase/service/keys'
import { IJsonObject } from '../interfaces/json'
import { ArrayUtils } from '../utils/array-utils'
import { BaseType } from './base-type'

export class RoleType extends BaseType {

    /**
     * They have full access rights, can add and remove admins
     */
    static Owner = 'owner'

    /**
     * An admin can change the status of any lower member
     */
    static Admin = 'admin'

    /**
     * Standard member of the chat, has write access but can't change roles
     */
    static Member = 'member'

    /**
     * Read-only access
     */
    static Watcher = 'watcher'

    /**
     * Cannot access the chat, cannot be added
     */
    static Banned = 'banned'

    constructor(type: BaseType | string) {
        super(type)
    }

    static owner(): RoleType {
        return new RoleType(this.Owner)
    }

    static admin(): RoleType {
        return new RoleType(this.Admin)
    }

    static member(): RoleType {
        return new RoleType(this.Member)
    }

    static watcher(): RoleType {
        return new RoleType(this.Watcher)
    }

    static banned(): RoleType {
        return new RoleType(this.Banned)
    }

    static none(): RoleType {
        return new RoleType('')
    }

    data(): IJsonObject {
        return { [Keys.Role]: this.get() }
    }

    test(roleType?: RoleType): boolean {
        return roleType !== undefined && roleType.toLevel() <= this.toLevel()
    }

    protected toLevel(): number {
        if (this.type === RoleType.Owner) {
            return 0;
        }
        if (this.type === RoleType.Admin) {
            return 1;
        }
        if (this.type === RoleType.Member) {
            return 2;
        }
        if (this.type === RoleType.Watcher) {
            return 3;
        }
        if (this.type === RoleType.Banned) {
            return 4;
        }
        return 5;
    }

    toString(): string {
        if (this.equals(RoleType.owner())) {
            return 'owner'
        }
        if (this.equals(RoleType.admin())) {
            return 'admin'
        }
        if (this.equals(RoleType.member())) {
            return 'member'
        }
        if (this.equals(RoleType.watcher())) {
            return 'watcher'
        }
        if (this.equals(RoleType.banned())) {
            return 'banned'
        }
        return ''
    }

    static allStringValues(): string[] {
        return this.allStringValuesExcluding()
    }

    static allStringValuesExcluding(...excluding: RoleType[]): string[] {
        return this.rolesToStringValues(this.allExcluding(...excluding))
    }

    static all(): RoleType[] {
        return this.allExcluding()
    }

    static allExcluding(... excluding: RoleType[]): RoleType[] {
        const roleTypes = [
            RoleType.owner(),
            RoleType.admin(),
            RoleType.member(),
            RoleType.watcher(),
            RoleType.banned(),
        ]
        return ArrayUtils.remove(roleTypes, ...excluding)
    }

    static rolesToStringValues(roleTypes: RoleType[]): string[] {
        return roleTypes.map(rt => rt.toString())
    }

    static reverseMap(): { [key: string]: RoleType } {
        const map: { [key: string]: RoleType } = {}
        for (const roleType of this.all()) {
            map[roleType.toString()] = roleType
        }
        return map
    }

    equals(roleType?: RoleType): boolean {
        return this.get() === roleType?.get()
    }

}
