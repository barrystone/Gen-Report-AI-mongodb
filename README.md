# Gen-Report-ai-mongodb

Currently, this project is a backend service that aims to generate a report based on the coding records of a user. The report is generated by AI model. The source data and the generated report are stored in MongoDB.

## Main Techs Stack

- TypeScript
- Node.js
- Express.js
- MongoDB

## Development Status

Work in progress.
Current structure of the project:

```
root/
│
├── src/
│ ├── app/
│ │ ├── routes.ts
│ ├── models/
│ │ ├── report.ts
│ │ └── codingRecord.ts
│ ├── services/
│ │ ├── openaiService.ts
| | ├── geminiService.ts // still working on it
│ │ ├── codingRecordService.ts
│ │ └── reportService.ts
│ ├── config/
│ │ └── database.ts
│ └── index.ts
├── .env
├── package.json
|── vercel.json
└── tsconfig.json
```
