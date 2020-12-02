import { dbConfig } from '../database.provider'
import fs = require('fs')
fs.writeFileSync('ormconfig.json', JSON.stringify(dbConfig, null, 2))
