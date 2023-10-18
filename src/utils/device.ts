import { exec, execSync } from 'child_process';
import { createHash } from 'crypto';

let { platform } = process;
const win32RegBinPath = {
    native: '%windir%\\System32',
    mixed: '%windir%\\sysnative\\cmd.exe /c %windir%\\System32'
};
const GUID = {
    darwin: 'ioreg -rd1 -c IOPlatformExpertDevice',
    win32: `${win32RegBinPath[isWindowsProcessMixedOrNativeArchitecture()]}\\REG.exe ` +
        'QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography ' +
        '/v MachineGuid',
    linux: '( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :',
    freebsd: 'kenv -q smbios.system.uuid || sysctl -n kern.hostuuid'
}

function isWindowsProcessMixedOrNativeArchitecture(): string {
    if (process.platform !== 'win32') {
        return '';
    }
    if (process.arch === 'ia32' && process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432')) {
        return 'mixed';
    }
    return 'native';
}

function hash(guid: string): string {
    return createHash('sha256').update(guid).digest('hex');
}

function expose(result: string): string {
    switch (platform) {
        case 'darwin':
            return result
                .split('IOPlatformUUID')[1]
                .split('\n')[0].replace(/\=|\s+|\"/ig, '')
                .toLowerCase();
        case 'win32':
            return result
                .toString()
                .split('REG_SZ')[1]
                .replace(/\r+|\n+|\s+/ig, '')
                .toLowerCase();
        case 'linux':
            return result
                .toString()
                .replace(/\r+|\n+|\s+/ig, '')
                .toLowerCase();
        case 'freebsd':
            return result
                .toString()
                .replace(/\r+|\n+|\s+/ig, '')
                .toLowerCase();
        default:
            throw new Error(`Unsupported platform: ${process.platform}`);
    }
}

export function getDeviceIdSync(original: boolean = true): string {
    let id: string = expose(execSync(GUID[platform]).toString());
    return original ? id : hash(id);
}

export function getDeviceId(original: boolean = true): Promise<string> {
    return new Promise((resolve: Function, reject: Function): Object => {
        return exec(GUID[platform], {}, (err: any, stdout: any, stderr: any) => {
            if (err) {
                return reject(
                    new Error(`Error while obtaining machine id: ${err.stack}`)
                );
            }
            let id: string = expose(stdout.toString());
            return resolve(original ? id : hash(id));
        });
    });
}