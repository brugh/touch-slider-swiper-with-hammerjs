import { Injectable } from "@angular/core";
import { DefaultHttpUrlGenerator, DefaultPluralizer, EntityMetadataMap, HttpResourceUrls, normalizeRoot, Pluralizer } from "@ngrx/data";
import { Product } from "./product.model";

export const entityMetadata: EntityMetadataMap = {
  Product: {
    // selectId: (product: Product) => product.id,
  },
}
const pluralNames = { Hero: 'Heroes' };

export const entityConfig = {
  entityMetadata,
  pluralNames
};

type Urls = { [key:string]: string; } // hbr; added for typescript errors on string indexing
export const rootUrls:Urls = {
  Product: 'api' // 'api/products' from local app (in memory db)
}

@Injectable()
export class DynamicHttpUrlGenerator extends DefaultHttpUrlGenerator {
  constructor(private aPluralizer: Pluralizer) {super(aPluralizer);}

  protected override getResourceUrls(entityName: string, root: string): HttpResourceUrls {
    let resourceUrls = this.knownHttpResourceUrls[entityName];
    if (!resourceUrls) {
      if (rootUrls.hasOwnProperty(entityName)) root = rootUrls[entityName];
      const nRoot = normalizeRoot(root);
      const url = `${nRoot}/${this.aPluralizer.pluralize(entityName)}/`.toLowerCase();
      resourceUrls = {
        entityResourceUrl: url,
        collectionResourceUrl: url
      };
      this.registerHttpResourceUrls({ [entityName]: resourceUrls });
    }
    return resourceUrls;
  }
}