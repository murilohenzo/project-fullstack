export const Queries = {
  findAll(): string {
    return `
    select l.*, count(d.level_id) as count_devs from levels l
    left join developers d
    on d.level_id = l.id
    group by l.id
   	order by l.id
    ;`;
  },
  findById(id: number): string {
    return `
    select l.*, count(d.level_id) as count_devs
    from levels l
    left join developers d
    on d.level_id = l.id
    where l.id = ${id}
    group by l.id
    order by l.id
    ;
    `;
  },
  search(name: string): string {
    return `
    select l.*, count(d.level_id) as count_devs from levels l
    left join developers d
    on d.level_id = l.id
    where l.level ilike '${name}%'
    group by l.id
    order by l.id;
    `;
  },
  pagination(take: number, page: number): string {
    return `
    select l.*, count(d.level_id) as count_devs from levels l
      left join developers d
      on d.level_id = l.id
      group by l.id
      offset ${(page - 1) * take} rows fetch next ${take} rows only
      ;
    `;
  },
};
