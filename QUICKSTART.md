# クイックスタートガイド

このガイドでは、5分でローカル環境をセットアップし、開発を開始する方法を説明します。

## 前提条件

- Node.js 20以上がインストール済み
- Firebaseアカウント（無料）
- Twilioアカウント（FAX機能用、後で設定可能）

## ステップ1: リポジトリのクローン

```bash
git clone https://github.com/informationdentee-spec/dentee-eeFax.git
cd dentee-eeFax
```

## ステップ2: 依存関係のインストール

```bash
# Next.jsアプリの依存関係
npm install

# Cloud Functionsの依存関係
cd functions
npm install
cd ..
```

## ステップ3: Firebaseプロジェクトの作成

1. [Firebase Console](https://console.firebase.google.com/)にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例: `dentee-eefax-dev`）
4. Google Analyticsは不要なのでスキップ可能
5. プロジェクトが作成されるのを待つ

## ステップ4: Firebaseサービスの有効化

### 4.1 Authentication
1. Firebase Console > Authentication
2. 「始める」をクリック
3. ログイン方法 > メール/パスワード > 有効化

### 4.2 Firestore
1. Firebase Console > Firestore Database
2. 「データベースを作成」をクリック
3. 本番モードで開始（セキュリティルールは後でデプロイ）
4. ロケーション: `asia-northeast1` (東京) を選択

### 4.3 Storage
1. Firebase Console > Storage
2. 「始める」をクリック
3. デフォルトのセキュリティルールで開始
4. ロケーション: `asia-northeast1` (東京) を選択

## ステップ5: Firebase設定の取得

1. Firebase Console > プロジェクトの設定（歯車アイコン）
2. 下にスクロールして「マイアプリ」セクション
3. ウェブアプリを追加（`</>`アイコンをクリック）
4. アプリのニックネーム: `dentee-eefax-web`
5. Firebase Hostingの設定はスキップ
6. 表示される設定値をコピー

## ステップ6: 環境変数の設定

```bash
# .env.localファイルを作成
cp .env.local.example .env.local

# エディタで.env.localを開く
nano .env.local
# または
code .env.local
```

Firebase設定値を貼り付け:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## ステップ7: Firebase CLIのインストールとログイン

```bash
# Firebase CLIをグローバルにインストール
npm install -g firebase-tools

# Firebaseにログイン
firebase login

# プロジェクトを初期化（すでに設定ファイルがあるので確認のみ）
firebase use --add
# プロジェクトを選択してエイリアスを `default` に設定
```

## ステップ8: セキュリティルールのデプロイ

```bash
# FirestoreとStorageのセキュリティルールをデプロイ
firebase deploy --only firestore,storage
```

成功メッセージが表示されれば完了！

## ステップ9: 開発サーバーの起動

```bash
# Next.js開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:3000 を開く

## ステップ10: 動作確認

1. ブラウザに「不動産FAX」のホームページが表示される
2. コンソールにエラーがないことを確認
3. Firebase接続が成功していることを確認

## 次のステップ

おめでとうございます！🎉 ローカル環境のセットアップが完了しました。

次は実装を開始しましょう：

1. [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)を読む
2. Phase 1から実装開始
3. 各機能を段階的に追加

## トラブルシューティング

### Firebase接続エラー

**問題**: `Firebase: Error (auth/invalid-api-key)`

**解決策**: 
- `.env.local`のAPIキーが正しいか確認
- `NEXT_PUBLIC_`プレフィックスが付いているか確認
- 開発サーバーを再起動（環境変数の変更後は必須）

### Firestoreアクセスエラー

**問題**: `Missing or insufficient permissions`

**解決策**:
- Firestoreのセキュリティルールがデプロイされているか確認
- `firebase deploy --only firestore`を実行
- Firebase Consoleでルールが適用されているか確認

### ビルドエラー

**問題**: `Cannot find module 'firebase'`

**解決策**:
```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

## Twilio設定（FAX機能用、後で設定可能）

FAX送受信機能を実装する際に必要：

1. [Twilio](https://www.twilio.com/)でアカウント作成
2. FAX対応の電話番号を取得
3. Cloud Functionsに環境変数を設定:

```bash
firebase functions:config:set twilio.account_sid="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
firebase functions:config:set twilio.auth_token="your_auth_token"
firebase functions:config:set twilio.fax_number="+15551234567"
```

## 開発のヒント

### Firebase Emulator（オプション）

本番Firebaseを使わずにローカルで開発：

```bash
# Firebase Emulatorをインストール
firebase init emulators

# Emulatorを起動
firebase emulators:start
```

### Cloud Functionsのローカル開発

```bash
cd functions
npm run serve
```

### ホットリロード

Next.jsは自動的にファイル変更を検出してリロードします。保存するだけでブラウザが更新されます。

## リソース

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Twilio Fax API](https://www.twilio.com/docs/fax)

## サポート

問題が発生した場合：

1. このガイドのトラブルシューティングセクションを確認
2. [README.md](./README.md)の詳細情報を確認
3. GitHubのIssuesで質問

Happy coding! 🚀
