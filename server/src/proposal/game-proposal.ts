export interface GameProposal {
  id: string;
  logins: string[];
  accepted: Set<string>;
  declined: boolean;
  loginDeclined?: string;
  timeout: NodeJS.Timeout;
}
