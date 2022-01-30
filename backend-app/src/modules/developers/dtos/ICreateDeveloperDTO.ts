type sex = "FEMALE" | "MALE";

export interface InterfaceCreateDeveloperDTO {
  level: string;
  name: string;
  sex: sex;
  birthDate: Date;
  age: number;
  hobby: string;
}
