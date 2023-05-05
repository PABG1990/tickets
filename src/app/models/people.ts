export default interface IPeople {
    id: number;
    customer_id: number;
    document_type_id: number;
    document: number;
    first_name: string;
    second_name?: string;
    first_lastname: string;
    second_lastname?: string;
    phone: string;
    email: string;
    created_at: string;
    register_status: string;
}