interface GroupModel {
  created_at: string;
  group_name: string;
  group_description: string;
  group_bank_account: string | null;
  id: string;
  group_owner: string | null;
  group_avatar: string | null;
  updated_at: string;
}

export default GroupModel;
