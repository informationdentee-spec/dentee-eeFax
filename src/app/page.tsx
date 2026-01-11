export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">不動産FAX</h1>
        <p className="text-xl text-gray-600 mb-8">
          Firebase中心の軽量インターネットFAXサービス
        </p>
        <div className="space-y-4">
          <p className="text-gray-500">
            認証、FAX送受信、履歴管理を提供
          </p>
          <p className="text-sm text-gray-400">
            テンプレート機能なし - シンプルで安定した動作にフォーカス
          </p>
        </div>
      </div>
    </main>
  )
}
