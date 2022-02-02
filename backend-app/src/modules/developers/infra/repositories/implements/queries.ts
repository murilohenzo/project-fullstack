export const Queries = {
  findAllDevelopers(): string {
    return `
      select d.id, d.name, d.sex, d.age, d.hobby, d.birth_date, d.level_id, l.level 
      from developers d inner join levels l on d.level_id = l.id order by d.id;
    `;
  },
  findByIdDevelopers(id: number): string {
    return `select d.id, d.name, d.sex, d.age, d.hobby, d.birth_date, d.level_id, l.level from developers d  inner join levels l on d.level_id = l.id where d.id = ${id};`;
  },
};
