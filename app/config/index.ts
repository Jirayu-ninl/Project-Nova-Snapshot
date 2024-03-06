export const app = {
  NAME: 'TheIceJi-NOVA',
  VERSION: '2024.3.601',
  UPDATE_DATE: 'Mar 6, 2024',
  s3: {
    bucketName: process.env.S3_UPLOAD_BUCKET ?? 'icejiverse',
    endpoint: process.env.S3_UPLOAD_ENDPOINT
  }
}

export default { app }
