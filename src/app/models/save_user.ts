export interface ISaveUser {
  person: {
    customer_id: number;
    document_type_id: number;
    document: number;
    first_name: string;
    second_name?: string;
    first_lastname: string;
    second_lastname?: string;
    phone: string;
    email: string;
  },
  user: {
    profile_id: number;
    username: string;
    password: string;
  }
}
