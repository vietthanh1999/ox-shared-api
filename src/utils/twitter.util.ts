import fs from "fs";
import path from "path";

export interface TwitterAccount {
    username: string;
    password: string;
    twoFA: string;
    email: string;
    emailPassword: string;
    status?: string;
    lastCheck?: Date;
  }
  

export function parseAccountsFromFile(filePath: string): TwitterAccount[] {
    console.log(filePath);
    const fileContent = fs.readFileSync(path.resolve(filePath), 'utf-8');
    const lines = fileContent
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#')); // Bỏ dòng trống và dòng comment

    const accounts = lines.map((line) => {
        return parseTwitterAccount(line);
    });

    return accounts;
}

export function parseTwitterAccount(line: string) {
    const [username, pass, fa, mail, mailPass, recoveryCode] = line.split('|');
    return {
        username,
        password: pass,
        twoFA: fa,
        email: mail,
        emailPassword: mailPass,
        recoveryCode,
    };
}
