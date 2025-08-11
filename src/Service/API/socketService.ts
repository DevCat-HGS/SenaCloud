import { io, Socket } from 'socket.io-client';

class SocketService {
    private socket: Socket | null = null;
    private static instance: SocketService | null = null;
    private readonly API_URL = 'http://localhost:3000'; // URL del servidor backend

    private constructor() {
        // Constructor privado para implementar el patrón Singleton
    }

    /**
     * Obtiene la instancia única del servicio de Socket.IO
     */
    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    /**
     * Inicializa la conexión con el servidor Socket.IO
     */
    public connect(): void {
        if (!this.socket) {
            this.socket = io(this.API_URL, {
                transports: ['websocket'],
                autoConnect: true,
            });

            this.socket.on('connect', () => {
                console.log('Conectado al servidor Socket.IO');
            });

            this.socket.on('disconnect', () => {
                console.log('Desconectado del servidor Socket.IO');
            });

            this.socket.on('connect_error', (error) => {
                console.error('Error de conexión Socket.IO:', error);
            });
        }
    }

    /**
     * Conecta a un namespace específico
     * @param namespace El namespace al que conectarse
     */
    public connectToNamespace(namespace: string): Socket {
        return io(`${this.API_URL}${namespace}`, {
            transports: ['websocket'],
            autoConnect: true,
        });
    }

    /**
     * Desconecta del servidor Socket.IO
     */
    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    /**
     * Emite un evento al servidor
     * @param event Nombre del evento
     * @param data Datos a enviar
     */
    public emit(event: string, data?: any): void {
        if (this.socket) {
            this.socket.emit(event, data);
        } else {
            console.error('Socket no inicializado. Llama a connect() primero.');
        }
    }

    /**
     * Escucha un evento del servidor
     * @param event Nombre del evento
     * @param callback Función a ejecutar cuando se reciba el evento
     */
    public on(event: string, callback: (...args: any[]) => void): void {
        if (this.socket) {
            this.socket.on(event, callback);
        } else {
            console.error('Socket no inicializado. Llama a connect() primero.');
        }
    }

    /**
     * Deja de escuchar un evento
     * @param event Nombre del evento
     */
    public off(event: string): void {
        if (this.socket) {
            this.socket.off(event);
        }
    }

    /**
     * Obtiene el ID del socket
     */
    public getSocketId(): string | null {
        return this.socket?.id || null;
    }

    /**
     * Verifica si el socket está conectado
     */
    public isConnected(): boolean {
        return this.socket ? this.socket.connected : false;
    }
}

export default SocketService.getInstance();