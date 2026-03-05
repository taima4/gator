import fs from "fs";
import os from "os";
import path from "path";

const CONFIG_FILE_NAME = ".gatorconfig.json";
export interface Config  {
  dbUrl:string ;
  currentUserName?: string;
} 
export function getConfigFilePath(): string{
    return path.join(os.homedir() , CONFIG_FILE_NAME);
}
export function validateConfig(rawConfig: any): Config{
    if (!rawConfig ||typeof rawConfig.db_url !== "string"){
        throw new Error('Invalid config file')
    }
    return {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name
    };
}

export function writeConfig(cfg: Config): void{
 const json = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName
  };
fs.writeFileSync(getConfigFilePath(), JSON.stringify(json, null, 2), "utf-8");
}

export function readConfig():Config{
    const jsonF=fs.readFileSync(getConfigFilePath(),'utf-8');
    const parsedJson= JSON.parse(jsonF);
    return validateConfig(parsedJson);
}
export function setUser(username:string){
const c= readConfig();
c.currentUserName = username;
writeConfig(c);
}

