import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TelegramBotApiService {

  private url: string = 'https://api.telegram.org'

  constructor(private http: HttpClient) { }

  public getMe(token: string): Observable<User> {
    return this.http.get<Response<User>>(`${this.url}/bot${token}/getMe`)
                    .pipe<User>(map(response => response.result))
  }

  public getUpdates(token: string): Observable<Update> {
    return this.http.get<Response<Update>>(`${this.url}/bot${token}/getUpdates`)
                    .pipe<Update>(map(response => response.result))
  }

}

export class Response<T> {
  ok: boolean
  result: T
}

/**
 * This object represents an incoming update.
 * At most one of the optional parameters can be present in any given update.
 */
export class Update {
  update_id: number                        // The update‘s unique identifier. Update identifiers start from a certain positive number and increase sequentially. This ID becomes especially handy if you’re using Webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially.
  message: Message                         // Optional. New incoming message of any kind — text, photo, sticker, etc.
  edited_message: Message                  // Optional. New version of a message that is known to the bot and was edited
  channel_post: Message                    // Optional. New incoming channel post of any kind — text, photo, sticker, etc.
  edited_channel_post: Message             // Optional. New version of a channel post that is known to the bot and was edited
  inline_query: InlineQuery                // Optional. New incoming inline query
  chosen_inline_result: ChosenInlineResult // Optional. The result of an inline query that was chosen by a user and sent to their chat partner. Please see our documentation on the feedback collecting for details on how to enable these updates for your bot.
  callback_query: CallbackQuery            // Optional. New incoming callback query
  shipping_query: ShippingQuery            // Optional. New incoming shipping query. Only for invoices with flexible price
  pre_checkout_query: PreCheckoutQuery     // Optional. New incoming pre-checkout query. Contains full information about checkout
  poll: Poll                               // Optional. New poll state. Bots receive only updates about polls, which are sent or stopped by the bot
}

/**
 * This object represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results.
 */
export class InlineQuery {
  id: string         // Unique identifier for this query
  from: User         // Sender
  location: Location // Optional. Sender location, only for bots that request user location
  query: string      // Text of the query (up to 512 characters)
  offset: string     // Offset of the results to be returned, can be controlled by the bot
}

/**
 * Represents a result of an inline query that was chosen by the user and sent to their chat partner.
 */
export class ChosenInlineResult {
  result_id: string         // The unique identifier for the result that was chosen
  from: User                // The user that chose the result
  location: Location        // Optional. Sender location, only for bots that require user location
  inline_message_id: string // Optional. Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. Will be also received in callback queries and can be used to edit the message.
  query: string             // The query that was used to obtain the result
}

/**
 * This object represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present. If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present. Exactly one of the fields data or game_short_name will be present.
 */
export class CallbackQuery {
  id: string                // Unique identifier for this query
  from: User                // Sender
  message: Message          // Optional. Message with the callback button that originated the query. Note that message content and message date will not be available if the message is too old
  inline_message_id: string // Optional. Identifier of the message sent via the bot in inline mode, that originated the query.
  chat_instance: string     // Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games.
  data: string              // Optional. Data associated with the callback button. Be aware that a bad client can send arbitrary data in this field.
  game_short_name: string   // Optional. Short name of a Game to be returned, serves as the unique identifier for the game
}

/**
 * This object contains information about an incoming shipping query.
 */
export class ShippingQuery {
  id: string                        // Unique query identifier
  from: User                        // User who sent the query
  invoice_payload: string           // Bot specified invoice payload
  shipping_address: ShippingAddress // User specified shipping address
}

/**
 * This object contains information about an incoming pre-checkout query.
 */
export class PreCheckoutQuery {
  id: string                 // Unique query identifier
  from: User                 // User who sent the query
  currency: string           // Three-letter ISO 4217 currency code
  total_amount: number       // Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
  invoice_payload: string    // Bot specified invoice payload
  shipping_option_id: string // Optional. Identifier of the shipping option chosen by the user
  order_info: OrderInfo      // Optional. Order info provided by the user
}

/**
 * This object represents a Telegram user or bot.
 */
export class User {
  id: number             //Unique identifier for this user or bot
  is_bot: boolean        //True, if this user is a bot
  first_name: string     //User‘s or bot’s first name
  last_name: string      //Optional. User‘s or bot’s last name
  username: string       //Optional. User‘s or bot’s username
  language_code: string  //Optional. IETF language tag of the user's language
}

/**
 * This object represents a chat.
 */
export class Chat {
  id: number                              // Unique identifier for this chat. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
  type: string                            // Type of chat, can be either “private”, “group”, “supergroup” or “channel”
  title: string                           // Optional. Title, for supergroups, channels and group chats
  username: string                        // Optional. Username, for private chats, supergroups and channels if available
  first_name: string                      // Optional. First name of the other party in a private chat
  last_name: string                       // Optional. Last name of the other party in a private chat
  all_members_are_administrators: boolean // Optional. True if a group has ‘All Members Are Admins’ enabled.
  photo: ChatPhoto                        // Optional. Chat photo. Returned only in getChat.
  description: string                     // Optional. Description, for supergroups and channel chats. Returned only in getChat.
  invite_link: string                     // Optional. Chat invite link, for supergroups and channel chats. Each administrator in a chat generates their own invite links, so the bot must first generate the link using exportChatInviteLink. Returned only in getChat.
  pinned_message: Message                 // Optional. Pinned message, for groups, supergroups and channels. Returned only in getChat.
  sticker_set_name: string                // Optional. For supergroups, name of group sticker set. Returned only in getChat.
  can_set_sticker_set: boolean            // Optional. True, if the bot can change the group sticker set. Returned only in getChat.
}

/**
 * This object represents a chat photo.
 */
export class ChatPhoto {
  small_file_id: string //Unique file identifier of small (160x160) chat photo. This file_id can be used only for photo download.
  big_file_id: string   //Unique file identifier of big (640x640) chat photo. This file_id can be used only for photo download. 
}

/**
 * This object represents a message.
 */
export class Message {
  message_id: number                     // Unique message identifier inside this chat
  from: User                             // Optional. Sender, empty for messages sent to channels
  date: number                           // Date the message was sent in Unix time
  chat: Chat                             // Conversation the message belongs to
  forward_from: User                     // Optional. For forwarded messages, sender of the original message
  forward_from_chat: Chat                // Optional. For messages forwarded from channels, information about the original channel
  forward_from_message_id: number        // Optional. For messages forwarded from channels, identifier of the original message in the channel
  forward_signature: string              // Optional. For messages forwarded from channels, signature of the post author if present
  forward_sender_name: string            // Optional. Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages
  forward_date: number                   // Optional. For forwarded messages, date the original message was sent in Unix time
  reply_to_message: Message              // Optional. For replies, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply.
  edit_date: number                      // Optional. Date the message was last edited in Unix time
  media_group_id: string                 // Optional. The unique identifier of a media message group this message belongs to
  author_signature: string               // Optional. Signature of the post author for messages in channels
  text: string                           // Optional. For text messages, the actual UTF-8 text of the message, 0-4096 characters.
  entities: MessageEntity[]	             // Optional. For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text
  caption_entities: MessageEntity[]	     // Optional. For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption
  audio: Audio                           // Optional. Message is an audio file, information about the file
  document: Document                     // Optional. Message is a general file, information about the file
  animation: Animation                   // Optional. Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set
  game: Game                             // Optional. Message is a game, information about the game. More about games »
  photo: PhotoSize[]	                   // Optional. Message is a photo, available sizes of the photo
  sticker: Sticker                       // Optional. Message is a sticker, information about the sticker
  video: Video                           // Optional. Message is a video, information about the video
  voice: Voice                           // Optional. Message is a voice message, information about the file
  video_note: VideoNote                  // Optional. Message is a video note, information about the video message
  caption: string                        // Optional. Caption for the animation, audio, document, photo, video or voice, 0-1024 characters
  contact: Contact                       // Optional. Message is a shared contact, information about the contact
  location: Location                     // Optional. Message is a shared location, information about the location
  venue: Venue                           // Optional. Message is a venue, information about the venue
  poll: Poll                             // Optional. Message is a native poll, information about the poll
  new_chat_members: User[]	             // Optional. New members that were added to the group or supergroup and information about them (the bot itself may be one of these members)
  left_chat_member: User                 // Optional. A member was removed from the group, information about them (this member may be the bot itself)
  new_chat_title: string                 // Optional. A chat title was changed to this value
  new_chat_photo: PhotoSize[]	           // Optional. A chat photo was change to this value
  delete_chat_photo: boolean             // Optional. Service message: the chat photo was deleted
  group_chat_created: boolean            // Optional. Service message: the group has been created
  supergroup_chat_created: boolean       // Optional. Service message: the supergroup has been created. This field can‘t be received in a message coming through updates, because bot can’t be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup.
  channel_chat_created: boolean          // Optional. Service message: the channel has been created. This field can‘t be received in a message coming through updates, because bot can’t be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel.
  migrate_to_chat_id: number             // Optional. The group has been migrated to a supergroup with the specified identifier. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
  migrate_from_chat_id: number           // Optional. The supergroup has been migrated from a group with the specified identifier. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
  pinned_message: Message                // Optional. Specified message was pinned. Note that the Message object in this field will not contain further reply_to_message fields even if it is itself a reply.
  invoice: Invoice                       // Optional. Message is an invoice for a payment, information about the invoice. More about payments »
  successful_payment: SuccessfulPayment  // Optional. Message is a service message about a successful payment, information about the payment. More about payments »
  connected_website: string              // Optional. The domain name of the website on which the user has logged in. More about Telegram Login »
  passport_data: PassportData            // Optional. Telegram Passport data
}

/**
 * This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc.
 */
export class MessageEntity {
  type: string    // Type of the entity. Can be mention (@username), hashtag, cashtag, bot_command, url, email, phone_number, bold (bold text), italic (italic text), code (monowidth string), pre (monowidth block), text_link (for clickable text URLs), text_mention (for users without usernames)
  offset: number  // Offset in UTF-16 code units to the start of the entity
  length: number  // Length of the entity in UTF-16 code units
  url: string     // Optional. For “text_link” only, url that will be opened after user taps on the text
  user: User      // Optional. For “text_mention” only, the mentioned u
}

/**
 * This object represents an audio file to be treated as music by the Telegram clients.
 */
export class Audio {
  file_id: string   // Unique identifier for this file
  duration: number  // Duration of the audio in seconds as defined by sender
  performer: string // Optional. Performer of the audio as defined by sender or by audio tags
  title: string     // Optional. Title of the audio as defined by sender or by audio tags
  mime_type: string // Optional. MIME type of the file as defined by sender
  file_size: number // Optional. File size
  thumb: PhotoSize  // Optional. Thumbnail of the album cover to which the music file belongs
}

/**
 * This object represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers.
 */
export class Game {
  title: string                // Title of the game
  description: string          // Description of the game
  photo: PhotoSize             // Photo that will be displayed in the game message in chats.
  text: string                 // Optional. Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters.
  text_entities: MessageEntity // Optional. Special entities that appear in text, such as usernames, URLs, bot commands, etc.
  animation: Animation         // Optional. Animation that will be displayed in the game message in chats. Upload via BotFather
}

/**
 * This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound).
 */
export class Animation {
  file_id: string   // Unique file identifier
  width: number     // Video width as defined by sender
  height: number    // Video height as defined by sender
  duration: number  // Duration of the video in seconds as defined by sender
  thumb: PhotoSize  // Optional. Animation thumbnail as defined by sender
  file_name: string // Optional. Original animation filename as defined by sender
  mime_type: string // Optional. MIME type of the file as defined by sender
  file_size: number // Optional. File size
}

/**
 * This object represents one size of a photo or a file / sticker thumbnail.
 */
export class PhotoSize {
  file_id: string    // Unique identifier for this file
  width: number      // Photo width
  height: number     // Photo height
  file_size: number  // Optional. File size
}

/**
 * This object represents a sticker.
 */
export class Sticker {
  file_id: string             // Unique identifier for this file
  width: number               // Sticker width
  height: number              // Sticker height
  thumb: PhotoSize            // Optional. Sticker thumbnail in the .webp or .jpg format
  emoji: string               // Optional. Emoji associated with the sticker
  set_name: string            // Optional. Name of the sticker set to which the sticker belongs
  mask_position: MaskPosition // Optional. For mask stickers, the position where the mask should be placed
  file_size: number           // Optional. File size
}

/**
 * This object describes the position on faces where a mask should be placed by default.
 */
export class MaskPosition {
  point: string   // The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”.
  x_shift: number // Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position.
  y_shift: number // Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position.
  scale: number   // Mask scaling coefficient. For example, 2.0 means double size.
}

/**
 * This object represents a video file.
 */
export class Video {
  file_id: string   // Unique identifier for this file
  width: number     // Video width as defined by sender
  height: number    // Video height as defined by sender
  duration: number  // Duration of the video in seconds as defined by sender
  thumb: PhotoSize  // Optional. Video thumbnail
  mime_type: string // Optional. Mime type of a file as defined by sender
  file_size: number // Optional. File size
}

/**
 * This object represents a voice note.
 */
export class Voice {
  file_id: string   // Unique identifier for this file
  duration: number  // Duration of the audio in seconds as defined by sender
  mime_type: string // Optional. MIME type of the file as defined by sender
  file_size: number // Optional. File size
}

/**
 * This object represents a video message (available in Telegram apps as of v.4.0).
 */
export class VideoNote {
  file_id: string   // Unique identifier for this file
  length: number    // Video width and height (diameter of the video message) as defined by sender
  duration: number  // Duration of the video in seconds as defined by sender
  thumb: PhotoSize  // Optional. Video thumbnail
  file_size: number // Optional. File size
}

/**
 * This object represents a phone contact.
 */
export class Contact {
  phone_number: string // Contact's phone number
  first_name: string   // Contact's first name
  last_name: string    // Optional. Contact's last name
  user_id: number      // Optional. Contact's user identifier in Telegram
  vcard: string        // Optional. Additional data about the contact in the form of a vCard
}

/**
 * This object represents a venue.
 */
export class Venue {
  location: Location      // Venue location
  title: string           // Name of the venue
  address: string         // Address of the venue
  foursquare_id: string   // Optional. Foursquare identifier of the venue
  foursquare_type: string // Optional. Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.)  
}

/**
 * This object contains information about a poll.
 */
export class Poll {
  id: string            // Unique poll identifier
  question: string      // Poll question, 1-255 characters
  options: PollOption[] // List of poll options
  is_closed: boolean    // True, if the poll is closed
}

/**
 * This object contains information about one answer option in a poll.
 */
export class PollOption {
  text: string        // Option text, 1-100 characters
  voter_count: number // Number of users that voted for this option
}

/**
 * This object contains basic information about an invoice.
 */
export class Invoice {
  title: string           // Product name
  description: string     // Product description
  start_parameter: string // Unique bot deep-linking parameter that can be used to generate this invoice
  currency: string        // Three-letter ISO 4217 currency code
  total_amount: number    // Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
}

/**
 * This object contains basic information about a successful payment.
 */
export class SuccessfulPayment {
  currency: string                   // Three-letter ISO 4217 currency code
  total_amount: number               // Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
  invoice_payload: string            // Bot specified invoice payload
  shipping_option_id: string         // Optional. Identifier of the shipping option chosen by the user
  order_info: OrderInfo              // Optional. Order info provided by the user
  telegram_payment_charge_id: string // Telegram payment identifier
  provider_payment_charge_id: string // Provider payment identifier
}

/**
 * This object represents information about an order.
 */
export class OrderInfo {
  name: string                      // Optional. User name
  phone_number: string              // Optional. User's phone number
  email: string                     // Optional. User email
  shipping_address: ShippingAddress // Optional. User shipping address
}

/**
 * This object represents a shipping address.
 */
export class ShippingAddress {
  country_code: string  // ISO 3166-1 alpha-2 country code
  state: string         // State, if applicable
  city: string          // City
  street_line1: string  // First line for the address
  street_line2: string  // Second line for the address
  post_code: string     // Address post code
}

/**
 * Contains information about Telegram Passport data shared with the bot by the user.
 */
export class PassportData {
  data: EncryptedPassportElement[]  // Array with information about documents and other Telegram Passport elements that was shared with the bot
  credentials: EncryptedCredentials // Encrypted credentials required to decrypt the data
}

/**
 * Contains information about documents or other Telegram Passport elements shared with the bot by the user.
 */
export class EncryptedPassportElement {
  type: string                // Element type. One of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”, “phone_number”, “email”.
  data: string                // Optional. Base64-encoded encrypted Telegram Passport element data provided by the user, available for “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport” and “address” types. Can be decrypted and verified using the accompanying EncryptedCredentials.
  phone_number: string        // Optional. User's verified phone number, available only for “phone_number” type
  email: string               // Optional. User's verified email address, available only for “email” type
  files: PassportFile[]       // Optional. Array of encrypted files with documents provided by the user, available for “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials.
  front_side: PassportFile    // Optional. Encrypted file with the front side of the document, provided by the user. Available for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials.
  reverse_side: PassportFile  // Optional. Encrypted file with the reverse side of the document, provided by the user. Available for “driver_license” and “identity_card”. The file can be decrypted and verified using the accompanying EncryptedCredentials.
  selfie: PassportFile        // Optional. Encrypted file with the selfie of the user holding a document, provided by the user; available for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials.
  translation: PassportFile[] // Optional. Array of encrypted files with translated versions of documents provided by the user. Available if requested for “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials.
  hash: string                // Base64-encoded element hash for using in PassportElementErrorUnspecified
}

/**
 * This object represents a file uploaded to Telegram Passport. Currently all Telegram Passport files are in JPEG format when decrypted and don't exceed 10MB.
 */
export class PassportFile {
  file_id: string   // Unique identifier for this file
  file_size: number // File size
  file_date: number // Unix time when the file was uploaded
}

/**
 * Contains data required for decrypting and authenticating EncryptedPassportElement. See the Telegram Passport Documentation for a complete description of the data decryption and authentication processes.
 */
export class EncryptedCredentials {
  data: string   // Base64-encoded encrypted JSON-serialized data with unique user's payload, data hashes and secrets required for EncryptedPassportElement decryption and authentication
  hash: string   // Base64-encoded data hash for data authentication
  secret: string // Base64-encoded secret, encrypted with the bot's public RSA key, required for data decryption
}

/**
 * This object represents a general file (as opposed to photos, voice messages and audio files).
 */
export class Document {
  file_id: string   // Unique file identifier
  thumb: PhotoSize  // Optional. Document thumbnail as defined by sender
  file_name: string // Optional. Original filename as defined by sender
  mime_type: string // Optional. MIME type of the file as defined by sender
  file_size: number // Optional. File size  
}
