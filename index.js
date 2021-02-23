// panggil konfigurasi di file .env
require('dotenv').config()
// Panggil library
const
{
   ChatModification,
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
   GroupSettingChange
} = require("@adiwajshing/baileys");
const qrcode = require("qrcode-terminal")
const fs = require('fs')
// Ngambil collections di Database
const {queue , active_sessions} = require('./config/database')

// Fungsi Helper
const helper = require('./helper/helper')

// nganbil prefix
// Moment buat ngambil tanggal
const moment = require('moment')

// Start Pooling bot
// lakukan fungsi di bawah kalo ada pesan ke bot
async function starts(){
	const zef = new WAConnection()
	zef.on('qr', qr => {
		qrcode.generate(qr, { small: true })
		console.log(`[!] Scan qrcode dengan whatsapp`)
	})

	zef.on('credentials-updated', () => {
		const authinfo = bot.base64EncodedAuthInfo()
		console.log('[!] Credentials Updated')

		fs.writeFileSync('./rizqi.json', JSON.stringify(authinfo, null, '\t'))
	})

	fs.existsSync('./rizqi.json') && bot.loadAuthInfo('./rizqi.json')

	zef.connect()

	zef.on('chat-update', async (msg) => {
		try {
			global.prefix
			
			const from = msg.key.remoteJid
			const isGroup = from.endsWith('@g.us')
			const type = Object.keys(msg.message)[0]
			const id = isGroup ? msg.participant : msg.key.remoteJid

			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

			body = (type === 'conversation' && msg.message.conversation.startsWith(prefix)) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption.startsWith(prefix) ? msg.message.imageMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption.startsWith(prefix) ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text.startsWith(prefix) ? msg.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
			
			 const argv = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			 const args = body.trim().split(/ +/).slice(1)
			 const isCmd = body.startsWith(prefix)

			 const groupMetadata = isGroup ? await bot.groupMetadata(from) : ''
			 const groupName = isGroup ? groupMetadata.subject : ''
			 const groupId   = isGroup ? groupMetadata.jid : ''
			 const isMedia   = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage')
			 
			 const content = JSON.stringify(msg.message)
			 
			 const isQuotedImage     = type === 'extendedTextMessage' && content.includes('imageMessage')
	         const isQuotedVideo     = type === 'extendedTextMessage' && content.includes('videoMessage')
	         const isQuotedAudio     = type === 'extendedTextMessage' && content.includes('audioMessage')
	         const isQuotedSticker   = type === 'extendedTextMessage' && content.includes('stickerMessage')
	         const isQuotedMessage   = type === 'extendedTextMessage' && content.includes('conversation')
} catch (e) {
	console.log(e)
	}
	})
	}
starts()