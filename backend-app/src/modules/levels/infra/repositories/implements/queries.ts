export const Queries = {
  findAllLevelsAndCountDevelopersAssociates(): string {
    return `
    select l.*, count(d.level_id) as count_levels from levels l
    inner join developers d
    on d.level_id = l.id
    group by l.id;`;
  },
  findByIdLevelsAndCountDevelopersAssociates(id: number): string {
    return `
    select l.*, count(d.level_id) as count_levels
    from levels l
    inner join developers d
    on d.level_id = l.id
    where l.id = ${id}
    group by l.id;
    `;
  },
};
