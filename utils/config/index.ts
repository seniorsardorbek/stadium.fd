import 'dotenv/config';
interface Config {
  mapKey: string;
}

const config: Config = {
  mapKey: process.env.YANDEX_MAP_API_KEY!,


};

export default config;
