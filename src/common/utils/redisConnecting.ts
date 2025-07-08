import * as net from 'net';

export const checkServiceConnection = async (host: string, port: number, serviceName: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const socket = new net.Socket();
        socket.setTimeout(5000); // 5 seconds timeout

        socket.connect(port, host, () => {
            console.log(`✅ ${serviceName} is connected`);
            socket.end(); // Close the connection
            resolve(true);
        });

        socket.on('error', (err) => {
            console.error(`❌ ${serviceName} connection failed:`, err);
            socket.destroy();
            reject(err);
        });

        socket.on('timeout', () => {
            console.error(`❌ ${serviceName} connection timed out`);
            socket.destroy();
            reject(new Error(`${serviceName} connection timed out`));
        });
    });
};
