interface GroupModel {
  id: string;
  created_at: string;
  group_name: string;
  group_description: string;
  group_bank_account: string | null;
  group_bank_code: string | null;
  group_owner: string | null;
  group_avatar: string | null;
  updated_at: string;
}

export default GroupModel;
