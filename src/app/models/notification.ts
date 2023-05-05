export default interface INotification {
    id: number;
    case_id: number;
    type: string;
    description: string;
    from: number;
    to: number;
    readed: number;
    created_at: string;
    register_status: string;
}