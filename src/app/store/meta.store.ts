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

type Urls = { [key:string]: string; } 
export const rootUrls:Urls = {
  Product: 'api' // 'api/products' from local app (in memory db)
}

@Injectable()
export class DynamicHttpUrlGenerator extends DefaultHttpUrlGenerator {

  constructor(private aPluralizer: Pluralizer) {
    super(aPluralizer);
  }

  protected override getResourceUrls(entityName: string, root: string): HttpResourceUrls {
    let resourceUrls = this.knownHttpResourceUrls[entityName];
    if (!resourceUrls) {
      // rootUrls contains
      // mapping of individual ngrx data entities 
      // to the root URLs of their respective data sources.
      // It contains only entities which do not have
      // the default root URL.
      if (rootUrls.hasOwnProperty(entityName)) {
        root = rootUrls[entityName];
      }
      const nRoot = normalizeRoot(root);
      const url = `${nRoot}/${this.aPluralizer.pluralize(entityName)}/`.toLowerCase();

      // remove after testing
      console.log('-- entityName: ' + entityName + ', URL: ' + url)

      resourceUrls = {
        entityResourceUrl: url,
        collectionResourceUrl: url
      };
      this.registerHttpResourceUrls({ [entityName]: resourceUrls });
    }
    return resourceUrls;
  }
}