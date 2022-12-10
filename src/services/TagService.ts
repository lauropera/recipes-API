import Tag from '../database/models/Tag';
import { ITagsList } from '../interfaces/IValuesList';
import { NameType } from '../interfaces/NameType';

class TagService {
  private _repository = Tag;

  async getTags(tags: string[]): Promise<ITagsList> {
    const tagsFound: number[] = [];
    const newTags: NameType[] = [];

    const tagsList = tags.map(async (name) => {
      const tag = await this._repository.findOne({ where: { name } });

      if (tag) {
        tagsFound.push(tag.dataValues.id);
      } else {
        newTags.push({ name });
      }
    });

    await Promise.all(tagsList);

    return { tagsFound, newTags };
  }
}

export default TagService;
