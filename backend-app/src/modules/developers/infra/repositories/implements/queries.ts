export const Queries = {
  findAll(): string {
    return `
      select d.id, d.name, d.sex, d.age, d.hobby, d.birth_date, d.level_id, l.level 
      from developers d 
      inner join levels l 
      on d.level_id = l.id 
      order by d.id;
    `;
  },
  findById(id: number): string {
    return `
    select d.id, d.name, d.sex, d.age, d.hobby, d.birth_date, d.level_id, l.level 
    from developers d  
    inner join levels l 
    on d.level_id = l.id 
    where d.id = ${id};`;
  },
  findByName(name: string): string {
    return `
      select d.id, d.name, d.sex, d.age, d.hobby, d.birth_date, d.level_id, l.level 
      from developers d 
      inner join levels l 
      on d.level_id = l.id 
      where d.name ilike '${name}%'
      order by d.id;
    `;
  },
  pagination(take: number, page: number): string {
    return `
    select d.id, d.name, d.sex, d.age, d.hobby, d.birth_date, d.level_id, l.level 
    from developers d 
    inner join levels l 
    on d.level_id = l.id 
    order by d.id
    offset ${(page - 1) * take} rows fetch next ${take} rows only
    `;
  },
};
