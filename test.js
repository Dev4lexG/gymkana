import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'

import { config as loadEnv } from 'dotenv'

loadEnv()

async function load() {
	const SCOPES = [
		'https://www.googleapis.com/auth/spreadsheets',
		'https://www.googleapis.com/auth/drive.file',
	]

	const jwt = new JWT({
		email: 'gymkana@silent-kite-330223.iam.gserviceaccount.com',
		key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCSXNyjRK+bm9MX\n71RSiKL86/65Yfn7iS71tScyn9Gm/+Waj4d+VV7jycVfcgL0X7ukPl/EjQOCJp6y\nbDCYNSIgNYdETFzO+GVPMakTk0044aL+4curGJ71D/nqnVhzd2LTuokCdErsyyEE\n2nkePnAyZ93yzu+PjKY1WNibbrY78v7nBinla1U64otm02VxckPJ4x9/oCRo+uF8\nwpBFUrVemREouvTMi6D105GV7MHPWRfnsNZz0ERfCTj0nVugcgU3i1Yrxv/k7DkK\n+fMVzUl9X3v7grUXkTWXGB7+p0x19oOt2Za7DRafbiJv+nNn8miNIayk7VQcDq/l\nzAY6dh7DAgMBAAECggEAAjWfVGJNDwRN2NFRbI2I0wNHrR9q2VPmKZS6gBZ5i76B\nMNF0h4EHwFiOFOAbu09WqHwTO1xa7olhYUAmMPtcWzAeV/bvJRC1jCSBG5KLBTjN\nb8Y+Ki8M90DD0mQzBEs2arZ+Kv37w5ICxZf8DBYqi22V+Xxg5sHbdc1e4mR2y8uG\nwzTD73m4rwrG+j9fVOQstWtoZsEzFfiVRSwt2p/jZFlP0pukdWRhh/2Bav72K0nj\n9+F3Z6iIn85EdyP9tZkyKU67Yv5EdsIEpvfjk/aV8y/K/MzESlzl+g0F3Us1bvZZ\nitOvKJmQPE8hvsMPqKe9CrOpbpyjCIxIAM4xYsEHAQKBgQDMcJ7vGtgbxC1IiYrf\nroXZ/ol4WVynXQpkyrngZ2QymncJQA8xl4UiT/490yhEm3MAAbWf2Sh0eLgk2NHO\nX1QUMA2Ph/bQgPHZHOMeEJg3CE3dOxLzkxr6fRknfdDNezem1AM2mmgCGl4S58wQ\nBrcIei5Plf7b8oIX0XUqSf5u8wKBgQC3RpGLHfwRPpw+HTFXzm/LXZsUTd71U3Ff\nmuNVF8nDOOkPLMbqRV5oIDei+/EKE3O9vI2vEVslYAxZyC8KbY/brj8mG3MsBSWn\ncATsLKtC/ZaT5yRCxxY6rvSjaRlpt4YmYRw+lnPfP4ig+41Unhw63wQ8Cek2pe5v\nboJ0MLSk8QKBgHjpzwZp4REjCQlS2AENrnrNEa9NYwBVhfUw9Zikbd2EAA1HhvT0\nwbgWia81OSbCrdR+LlaZUFT6pSad2hDtzsOV3B9c8fxFl0Sq0iUQ+YXq8mp7Ku1G\nvvkRjhQOVLWDP9n6oN/lmMhNogAaelWsMwrfgI5vj2m0136Q0nQtiT9DAoGANNLR\nFiCxSyMZk0mEtEMas6mqDeMX1OuU7LJOvXLawzq+6ZHFTzZpLGfEwWQOKBJNNK2I\nxKGi/JW/WY06Ca5kXTPOnaQhwNlG7gh6UrvZLLi8Uqq3J8wL2yQb/JFJMtAjiSJK\nKrvgb8L3FTcLmAzuJAWtScSthAO1Qka+sNBs8HECgYAyzBg5O7MJ3I+YuoUo+kKe\n/6m0yy+3TnK3i8YP6DwMtSSInNxyN7snyaXQOIesJdJ0PSC9t8lz820n7ljApkY5\n3Ok29rAdPXkQDT1wfIM9YwNxYXXxHYFi/SwOhSjjRYYaq15YQWrhB91AvV11tNuP\n+exQ9os0O+FtHR0OFrxulw==\n-----END PRIVATE KEY-----\n',
		scopes: SCOPES,
	})

	const doc = new GoogleSpreadsheet(process.env.DOC, jwt)

	await doc.loadInfo()

	const sheet = doc.sheetsByTitle['Datos']

	await sheet.setHeaderRow(['a', 'b'], 2)

	await sheet.addRows([
		{ a: 'asd', b: 'jeje' },
		{ a: 'just', b: 'doit' },
	])
	/* 
	const rows = await sheet.getRows()
	console.log(rows.lengt) */
}

load()
