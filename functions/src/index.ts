import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// FAX送信処理
export const sendFax = functions.https.onCall(async (data, context) => {
  // 認証チェック
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { faxNumber, fileUrl, propertyName, viewingDate, viewingTime, agentName } = data;
  const userId = context.auth.uid;

  try {
    // Twilio設定（環境変数から取得）
    const accountSid = functions.config().twilio.account_sid;
    const authToken = functions.config().twilio.auth_token;
    const twilioFaxNumber = functions.config().twilio.fax_number;
    
    // Twilio SDKの初期化（実装例）
    // const twilio = require('twilio')(accountSid, authToken);
    
    // FAX送信処理（Twilio API呼び出し）
    // const fax = await twilio.fax.faxes.create({
    //   from: twilioFaxNumber,
    //   to: faxNumber,
    //   mediaUrl: fileUrl,
    // });

    // Firestoreに送信履歴を保存
    const faxDoc = await admin.firestore().collection('sentFaxes').add({
      userId,
      faxNumber,
      fileUrl,
      fileName: data.fileName || 'fax.pdf',
      status: 'sent',
      propertyName,
      viewingDate,
      viewingTime,
      agentName,
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true, faxId: faxDoc.id };
  } catch (error: any) {
    console.error('Error sending fax:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// FAX受信Webhook
export const receiveFaxWebhook = functions.https.onRequest(async (req, res) => {
  try {
    // Twilioからのwebhookデータを処理
    const { From, MediaUrl, To } = req.body;

    // ここでは簡易的な実装
    // 実際にはユーザーIDの特定ロジックが必要
    
    // 受信FAXをFirestoreに保存
    await admin.firestore().collection('receivedFaxes').add({
      userId: 'default', // 実際には受信FAX番号からユーザーを特定
      fromFaxNumber: From,
      fileUrl: MediaUrl,
      fileName: `received_${Date.now()}.pdf`,
      receivedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).send('OK');
  } catch (error: any) {
    console.error('Error receiving fax:', error);
    res.status(500).send('Error');
  }
});

// OCR処理（Cloud Storageへのファイルアップロード時にトリガー）
export const processOCR = functions.storage.object().onFinalize(async (object) => {
  const filePath = object.name;
  const contentType = object.contentType;

  // PDFまたは画像ファイルのみ処理
  if (!contentType || (!contentType.includes('pdf') && !contentType.includes('image'))) {
    return;
  }

  try {
    // Google Cloud Vision APIを使用したOCR処理
    // const vision = require('@google-cloud/vision');
    // const client = new vision.ImageAnnotatorClient();
    
    // const gcsSourceUri = `gs://${object.bucket}/${filePath}`;
    // const [result] = await client.documentTextDetection(gcsSourceUri);
    // const fullText = result.fullTextAnnotation?.text || '';

    // 簡易的な実装として、ファイルパスからFAX IDを取得
    // 実際にはより堅牢なロジックが必要
    
    console.log(`OCR processing for file: ${filePath}`);
    
    // OCR結果をFirestoreに保存する処理
    // await admin.firestore().collection('sentFaxes').doc(faxId).update({
    //   ocrData: { rawText: fullText }
    // });

    return;
  } catch (error: any) {
    console.error('Error processing OCR:', error);
    return;
  }
});
