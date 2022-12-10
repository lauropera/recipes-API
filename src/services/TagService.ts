import Tag from '../database/models/Tag';
import { ITagsList, tagName } from '../interfaces/IValuesList';

class TagService {
  private _repository = Tag;

  async getTags(tags: string[]): Promise<ITagsList> {
    const tagsFound: number[] = [];
    const newTags: tagName[] = [];

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
