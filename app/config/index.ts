export const app = {
  NAME: 'TheIceJi-NOVA',
  VERSION: '2024.3.801',
  UPDATE_DATE: 'Mar 8, 2024',
  s3: {
    bucketName: process.env.S3_UPLOAD_BUCKET ?? 'nova',
    endpoint: process.env.S3_UPLOAD_ENDPOINT
  }
}

export default { app }
