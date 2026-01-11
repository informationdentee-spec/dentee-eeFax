# 不動産FAX - Firebase中心の軽量インターネットFAXサービス

## 概要

不動産業界向けのシンプルで安定したインターネットFAXサービス。Firebase中心のアーキテクチャで、素早く信頼性の高い動作を実現します。

## 主な特徴

- ✅ **Firebase中心**: 認証、データベース、ストレージ、サーバーレス処理をFirebaseで統合
- ✅ **軽量設計**: 最小限の依存関係、シンプルな構成
- ✅ **安定性優先**: 実績のあるサービスとシンプルな実装
- ✅ **段階的開発**: 小さい粒度で機能を追加
- ❌ **テンプレート機能なし**: 複雑な機能は排除
- ❌ **E2Eテスト最小限**: 必要最小限のテストにフォーカス

## 技術スタック

### フロントエンド
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React

### バックエンド（Firebase）
- Firebase Authentication - ユーザー認証
- Cloud Firestore - NoSQLデータベース
- Cloud Storage - ファイル保存
- Cloud Functions - サーバーレス処理

### 外部サービス
- Twilio Fax API - FAX送受信
- Google Cloud Vision API - OCR処理（オプション）

## セットアップ

### 前提条件
- Node.js 20以上
- Firebase CLIツール
- Firebaseプロジェクト
- Twilioアカウント（FAX APIアクセス）

### インストール

```bash
# リポジトリクローン
git clone https://github.com/informationdentee-spec/dentee-eeFax.git
cd dentee-eeFax

# 依存関係インストール
npm install

# Functionsの依存関係インストール
cd functions
npm install
cd ..
```

### Firebase設定

1. Firebaseプロジェクトを作成: https://console.firebase.google.com/

2. Firebase CLIでログイン:
```bash
firebase login
firebase init
```

3. 環境変数設定:
```bash
# .env.localファイルを作成
cp .env.local.example .env.local

# Firebaseの設定値を入力
# Project Settings > General から取得
```

4. Firestore、Storage、Authenticationを有効化:
```bash
# Firebaseコンソールで以下を有効化:
# - Authentication (Email/Password)
# - Cloud Firestore
# - Cloud Storage
```

5. セキュリティルールとインデックスをデプロイ:
```bash
firebase deploy --only firestore,storage
```

### Twilio設定

1. Twilioアカウント作成: https://www.twilio.com/

2. FAX対応の電話番号を取得

3. Cloud Functionsに環境変数を設定:
```bash
firebase functions:config:set twilio.account_sid="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
firebase functions:config:set twilio.auth_token="your_auth_token"
firebase functions:config:set twilio.fax_number="+15551234567"
```

## 開発

### ローカル開発サーバー起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開く

### Cloud Functionsのローカルエミュレータ

```bash
cd functions
npm run serve
```

### ビルド

```bash
npm run build
```

## デプロイ

### Firebase Hostingにデプロイ

```bash
# Next.jsアプリをビルド
npm run build

# Firebaseにデプロイ
firebase deploy
```

### Cloud Functionsのみデプロイ

```bash
firebase deploy --only functions
```

## プロジェクト構造

```
dentee-eeFax/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Reactコンポーネント
│   ├── lib/
│   │   └── firebase/     # Firebase SDK設定
│   └── types/            # TypeScript型定義
├── functions/            # Cloud Functions
├── public/               # 静的ファイル
├── firebase.json         # Firebase設定
├── firestore.rules       # Firestoreセキュリティルール
├── firestore.indexes.json # Firestoreインデックス
└── storage.rules         # Storageセキュリティルール
```

## 主要機能

### Phase 1: MVP（実装済み設計）
- [ ] Firebase Authentication（メール/パスワード）
- [ ] FAX送信（基本）
- [ ] FAX受信（webhook）
- [ ] 送受信履歴管理
- [ ] アドレス帳

### Phase 2: 拡張機能（今後）
- [ ] OCR統合
- [ ] 内見申請ワークフロー
- [ ] 詳細検索機能

### 削除された機能（軽量化のため）
- ❌ テンプレート機能
- ❌ 物件情報連携
- ❌ 顧客管理連携
- ❌ AI推論機能

## セキュリティ

- Firestoreセキュリティルールでユーザーごとのデータアクセス制御
- Cloud Storageルールでファイルアクセス制御
- HTTPS通信必須
- Firebase Authenticationによる認証

## テスト

```bash
# 単体テスト
npm test

# E2Eテスト（最小限）
npm run test:e2e
```

## ライセンス

MIT

## サポート

問題が発生した場合は、GitHubのIssuesで報告してください。

## 詳細設計

詳細なアーキテクチャについては [ARCHITECTURE.md](./ARCHITECTURE.md) を参照してください。
