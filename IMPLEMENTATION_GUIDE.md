# 実装ガイド - 段階的な開発プラン

このドキュメントは、Firebase中心の軽量アーキテクチャでの実装を段階的に進めるためのガイドです。

## 開発方針

1. **小さい粒度で実装**: 各機能を最小単位に分割
2. **テストは最小限**: E2Eテストは基本フローのみ、単体テストは重要関数のみ
3. **テンプレート機能なし**: 複雑なテンプレート機能は実装しない
4. **安定性優先**: 動作する最小限の機能から始める

## Phase 1: 基盤構築（1-2日）

### Step 1.1: Next.jsプロジェクト初期化 ✅
- [x] package.json作成
- [x] tsconfig.json設定
- [x] Next.js設定ファイル
- [x] Tailwind CSS設定
- [x] 基本的なレイアウト

### Step 1.2: Firebase設定 ✅
- [x] firebase.json作成
- [x] Firestoreルール作成
- [x] Storageルール作成
- [x] インデックス定義
- [x] Firebase SDK設定ファイル

### Step 1.3: 認証機能実装
- [ ] ログインページ作成 (`/login`)
- [ ] ユーザー登録ページ作成 (`/register`)
- [ ] 認証状態管理（Context/Provider）
- [ ] 認証ミドルウェア
- [ ] ログアウト機能

**実装ファイル:**
- `src/app/login/page.tsx`
- `src/app/register/page.tsx`
- `src/contexts/AuthContext.tsx`
- `src/middleware.ts`

**テスト:**
- 単体テスト: `tests/unit/lib/firebase/auth.test.ts`
- E2E: `tests/e2e/auth.spec.ts`（ログイン/ログアウトのみ）

## Phase 2: FAX送信機能（2-3日）

### Step 2.1: ファイルアップロード
- [ ] ファイルアップロードフォーム作成
- [ ] Cloud Storageへのアップロード処理
- [ ] アップロード進捗表示
- [ ] ファイル形式検証（PDF/画像のみ）

**実装ファイル:**
- `src/components/fax/FaxUploadForm.tsx`
- `src/app/fax/send/page.tsx`

### Step 2.2: FAX送信API
- [ ] Cloud Function: `sendFax`
- [ ] Twilio SDK統合
- [ ] 送信ステータス管理
- [ ] エラーハンドリング

**実装ファイル:**
- `functions/src/fax/send.ts`
- `src/app/api/fax/send/route.ts`

### Step 2.3: 送信履歴
- [ ] 送信履歴一覧ページ
- [ ] Firestoreからのデータ取得
- [ ] ステータス表示（pending/sent/failed）
- [ ] 基本的なフィルタリング

**実装ファイル:**
- `src/app/fax/history/page.tsx`
- `src/components/fax/FaxHistoryList.tsx`

**テスト:**
- 単体テスト: `tests/unit/api/fax-send.test.ts`
- E2E: `tests/e2e/send-fax.spec.ts`（基本フローのみ）

## Phase 3: FAX受信機能（2日）

### Step 3.1: 受信Webhook
- [ ] Cloud Function: `receiveFaxWebhook`
- [ ] Twilioからのwebhook処理
- [ ] 受信FAXの保存
- [ ] ユーザーへの通知（オプション）

**実装ファイル:**
- `functions/src/fax/receive.ts`

### Step 3.2: 受信履歴
- [ ] 受信FAX一覧ページ
- [ ] FAXプレビュー表示
- [ ] ダウンロード機能
- [ ] 基本的な検索

**実装ファイル:**
- `src/app/fax/received/page.tsx`
- `src/components/fax/ReceivedFaxList.tsx`

**テスト:**
- 統合テスト: `tests/integration/webhook.test.ts`

## Phase 4: アドレス帳（1日）

### Step 4.1: CRUD機能
- [ ] アドレス帳一覧ページ
- [ ] 連絡先追加フォーム
- [ ] 連絡先編集機能
- [ ] 連絡先削除機能

**実装ファイル:**
- `src/app/address-book/page.tsx`
- `src/components/addressbook/ContactForm.tsx`
- `src/app/api/address-book/route.ts`

### Step 4.2: FAX送信との連携
- [ ] 送信フォームにアドレス帳からの選択機能追加
- [ ] FAX番号の自動入力

**テスト:**
- 単体テスト: `tests/unit/api/address-book.test.ts`

## Phase 5: OCR統合（オプション・2-3日）

### Step 5.1: OCR処理
- [ ] Cloud Function: `processOCR`
- [ ] Google Cloud Vision API統合
- [ ] テキスト抽出処理
- [ ] 結果のパース（管理会社名、FAX番号）

**実装ファイル:**
- `functions/src/ocr/process.ts`
- `src/app/api/ocr/extract/route.ts`

### Step 5.2: 自動入力機能
- [ ] OCR結果から送信フォームへの自動入力
- [ ] 抽出結果の確認/修正UI

**テスト:**
- 単体テスト: `tests/unit/ocr/extract.test.ts`

## Phase 6: 内見申請ワークフロー（オプション・2日）

### Step 6.1: 内見情報入力
- [ ] 内見日時選択UI
- [ ] 担当者名入力
- [ ] 物件名入力

**実装ファイル:**
- `src/components/fax/ViewingRequestForm.tsx`

### Step 6.2: PDF生成
- [ ] シンプルな内見依頼書PDF生成
- [ ] テンプレートは固定（1種類のみ）
- [ ] FAX送信との統合

**実装ファイル:**
- `functions/src/pdf/generate.ts`

## Phase 7: UI/UX改善（1-2日）

### Step 7.1: レイアウト
- [ ] ヘッダーコンポーネント
- [ ] サイドバーナビゲーション
- [ ] レスポンシブ対応

**実装ファイル:**
- `src/components/layout/Header.tsx`
- `src/components/layout/Sidebar.tsx`

### Step 7.2: ダッシュボード
- [ ] 送受信統計表示
- [ ] 最近のFAX履歴
- [ ] クイックアクション

**実装ファイル:**
- `src/app/dashboard/page.tsx`

## 削除される機能（実装しない）

以下の機能は、軽量化と安定性優先のため実装しません：

- ❌ **複雑なテンプレート機能**
  - テンプレートエディタ
  - 変数挿入機能
  - テンプレートカテゴリ管理
  
- ❌ **物件情報連携**
  - 物件データベース
  - 物件からのFAX送信
  
- ❌ **顧客管理連携**
  - 顧客データベース
  - 顧客グループ管理
  
- ❌ **AI推論機能**
  - 管理会社の高度な推定
  - FAX種類のサジェスト
  
- ❌ **一括送信機能**（後から追加可能）

- ❌ **包括的なE2Eテスト**
  - すべての画面のE2Eテスト
  - エッジケースのテスト
  - パフォーマンステスト

## 最小限のテスト戦略

### 実装するテスト

1. **単体テスト（Vitest）**
   - `lib/firebase/auth.ts`の認証関数
   - `lib/firebase/firestore.ts`のデータ操作関数
   - OCR処理関数（実装する場合）

2. **統合テスト**
   - API Routes（`/api/fax/send`, `/api/address-book`）
   - Webhook処理

3. **E2Eテスト（Playwright）- 最小限**
   - ログイン/ログアウト
   - FAX送信の基本フロー
   - 受信履歴の表示

### 実装しないテスト

- ❌ すべてのページのE2Eテスト
- ❌ UIコンポーネントの単体テスト
- ❌ エッジケースの網羅的テスト
- ❌ パフォーマンステスト
- ❌ ロードテスト

## 開発時の注意点

1. **依存関係を最小限に**
   - 新しいライブラリの追加は慎重に
   - Firebaseの標準機能を優先

2. **エラーハンドリングはシンプルに**
   - 基本的なtry-catchのみ
   - 詳細なエラー処理は後回し

3. **UI/UXはシンプルに**
   - 複雑なアニメーションなし
   - 基本的なTailwind CSSスタイルのみ

4. **コメントは最小限**
   - 自明なコードにはコメント不要
   - 複雑なロジックのみコメント

## デプロイチェックリスト

- [ ] Firebase Authenticationが有効
- [ ] Firestoreセキュリティルールがデプロイ済み
- [ ] Storageセキュリティルールがデプロイ済み
- [ ] Twilio環境変数が設定済み
- [ ] Cloud Functionsがデプロイ済み
- [ ] Next.jsアプリがビルド成功
- [ ] Firebase Hostingにデプロイ

## トラブルシューティング

### Firebase接続エラー
- `.env.local`の設定を確認
- Firebaseコンソールで認証情報を再確認

### Twilio FAX送信エラー
- アカウント残高を確認
- FAX番号が有効か確認
- Webhook URLが正しいか確認

### Cloud Functionsのエラー
- `firebase functions:log`でログを確認
- 環境変数が正しく設定されているか確認

## 次のステップ

このガイドに従って、段階的に実装を進めてください。各フェーズが完了したら、次のフェーズに進む前に動作確認を行ってください。

問題が発生した場合は、GitHubのIssuesで報告してください。
