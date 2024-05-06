export interface UserData {
    username: string
    password: string
    decks?: DeckData[] 
}

export interface DeckData {
    _id?: string
    fraction: FractionData
    cards: CardData[]
    active: boolean
}

export interface FractionData {
    name: string
    ability: string
    leader: LeaderData
}

export interface CardData {
    _id?: string
    name: string
    type: string
    power: number | null
    ability: string
    img: string
    fraction: string
    hero: boolean
}

export interface LeaderData {
    name: string
    ability: string
}

export interface RoomData {
    _id?: string
    users: UserData[] 
}

export interface UserGameState {
    username: string 
    fraction: string
    cardsOnTheTable: CardData[]
    currentCards: CardData[]
    cardsInDeck: CardData[]
    lostCards: CardData[]
    totalPower: number
    lostRounds: number
  }

export interface GameState {
    user: UserGameState,
    opponent: UserGameState
}