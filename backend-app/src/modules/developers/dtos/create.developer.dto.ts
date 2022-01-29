type sex = 'FEMALE' | 'MALE'

export interface ICreateDeveloperDTO {
  level: string;
  name: string;
  sex: sex;
  birthDate: Date
  age: number;
  hobby: string;
}