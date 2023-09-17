export interface IProductOpenFood {
    code: string;
    product: IProduct;
    status: number;
    status_verbose: string;
}

export interface IProduct {
    _id: string;
    _keywords: string[];
    abbreviated_product_name: string;
    abbreviated_product_name_fr: string;
    abbreviated_product_name_fr_imported: string;
    added_countries_tags: any[];
    additives_debug_tags: string[];
    additives_n: number;
    additives_old_n: number;
    additives_old_tags: string[];
    additives_original_tags: string[];
    additives_prev_original_tags: string[];
    additives_tags: string[];
    allergens: string;
    allergens_from_ingredients: string;
    allergens_from_user: string;
    allergens_hierarchy: string[];
    allergens_imported: string;
    allergens_tags: string[];
    amino_acids_prev_tags: any[];
    amino_acids_tags: any[];
    brands: string;
    brands_imported: string;
    brands_tags: string[];
    carbon_footprint_from_known_ingredients_debug: string;
    carbon_footprint_percent_of_known_ingredients: number;
    categories: string;
    categories_hierarchy: string[];
    categories_lc: string;
    categories_old: string;
    categories_properties: CategoriesProperties;
    categories_properties_tags: string[];
    categories_tags: string[];
    category_properties: CategoryProperties;
    checkers_tags: any[];
    ciqual_food_name_tags: string[];
    cities_tags: any[];
    code: string;
    codes_tags: string[];
    compared_to_category: string;
    complete: number;
    completeness: number;
    conservation_conditions: string;
    conservation_conditions_fr: string;
    conservation_conditions_fr_imported: string;
    correctors_tags: string[];
    countries: string;
    countries_beforescanbot: string;
    countries_hierarchy: string[];
    countries_imported: string;
    countries_lc: string;
    countries_tags: string[];
    created_t: number;
    creator: string;
    customer_service: string;
    customer_service_fr: string;
    customer_service_fr_imported: string;
    data_quality_bugs_tags: any[];
    data_quality_errors_tags: any[];
    data_quality_info_tags: string[];
    data_quality_tags: string[];
    data_quality_warnings_tags: string[];
    data_sources: string;
    data_sources_imported: string;
    data_sources_tags: string[];
    debug_param_sorted_langs: string[];
    ecoscore_data: EcoscoreData;
    ecoscore_grade: EcoscoreGrade;
    ecoscore_score: number;
    ecoscore_tags: EcoscoreGrade[];
    editors: string[];
    editors_tags: string[];
    emb_codes: string;
    emb_codes_20141016: string;
    emb_codes_debug_tags: any[];
    emb_codes_orig: string;
    emb_codes_tags: any[];
    entry_dates_tags: string[];
    expiration_date: string;
    expiration_date_debug_tags: any[];
    food_groups: string;
    food_groups_tags: string[];
    "fruits-vegetables-nuts_100g_estimate": number;
    generic_name: string;
    generic_name_fr: string;
    generic_name_fr_debug_tags: any[];
    generic_name_fr_imported: string;
    grades: Grades;
    id: string;
    image_front_small_url: string;
    image_front_thumb_url: string;
    image_front_url: string;
    image_ingredients_small_url: string;
    image_ingredients_thumb_url: string;
    image_ingredients_url: string;
    image_nutrition_small_url: string;
    image_nutrition_thumb_url: string;
    image_nutrition_url: string;
    image_packaging_small_url: string;
    image_packaging_thumb_url: string;
    image_packaging_url: string;
    image_small_url: string;
    image_thumb_url: string;
    image_url: string;
    images: Images;
    informers_tags: string[];
    ingredients: Ingredient[];
    ingredients_analysis: IngredientsAnalysis;
    ingredients_analysis_tags: string[];
    ingredients_debug: Array<null | string>;
    ingredients_from_or_that_may_be_from_palm_oil_n: number;
    ingredients_from_palm_oil_n: number;
    ingredients_from_palm_oil_tags: string[];
    ingredients_hierarchy: string[];
    ingredients_ids_debug: string[];
    ingredients_n: number;
    ingredients_n_tags: string[];
    ingredients_original_tags: string[];
    ingredients_percent_analysis: number;
    ingredients_tags: string[];
    ingredients_text: string;
    ingredients_text_debug: string;
    ingredients_text_fr: string;
    ingredients_text_fr_imported: string;
    ingredients_text_with_allergens: string;
    ingredients_text_with_allergens_fr: string;
    ingredients_that_may_be_from_palm_oil_n: number;
    ingredients_that_may_be_from_palm_oil_tags: any[];
    ingredients_with_specified_percent_n: number;
    ingredients_with_specified_percent_sum: number;
    ingredients_with_unspecified_percent_n: number;
    ingredients_with_unspecified_percent_sum: number;
    ingredients_without_ciqual_codes: string[];
    ingredients_without_ciqual_codes_n: number;
    interface_version_created: string;
    interface_version_modified: string;
    known_ingredients_n: number;
    labels: string;
    labels_hierarchy: string[];
    labels_lc: string;
    labels_old: string;
    labels_tags: string[];
    lang: string;
    lang_debug_tags: any[];
    lang_imported: string;
    languages: Languages;
    languages_codes: LanguagesCodes;
    languages_hierarchy: string[];
    languages_tags: string[];
    last_edit_dates_tags: string[];
    last_editor: string;
    last_image_dates_tags: string[];
    last_image_t: number;
    last_modified_by: string;
    last_modified_t: number;
    lc: string;
    lc_imported: string;
    link: string;
    link_debug_tags: any[];
    main_countries_tags: any[];
    manufacturing_places: string;
    manufacturing_places_debug_tags: any[];
    manufacturing_places_tags: any[];
    max_imgid: string;
    minerals_prev_tags: string[];
    minerals_tags: string[];
    misc_tags: string[];
    new_additives_n: number;
    no_nutrition_data: string;
    nova_group: number;
    nova_group_debug: string;
    nova_groups: string;
    nova_groups_markers: { [key: string]: Array<string[]> };
    nova_groups_tags: string[];
    nucleotides_prev_tags: any[];
    nucleotides_tags: any[];
    nutrient_levels: NutrientLevels;
    nutrient_levels_tags: string[];
    nutriments: Nutriments;
    nutriscore: { [key: string]: Nutriscore };
    nutriscore_2021_tags: string[];
    nutriscore_2023_tags: EcoscoreGrade[];
    nutriscore_data: NutriscoreData;
    nutriscore_grade: string;
    nutriscore_score: number;
    nutriscore_score_opposite: number;
    nutriscore_tags: string[];
    nutriscore_version: string;
    nutrition_data: string;
    nutrition_data_per: string;
    nutrition_data_per_imported: string;
    nutrition_data_prepared_per: string;
    nutrition_data_prepared_per_imported: string;
    nutrition_grade_fr: string;
    nutrition_grades: string;
    nutrition_grades_tags: string[];
    nutrition_score_beverage: number;
    nutrition_score_debug: string;
    nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients: number;
    nutrition_score_warning_fruits_vegetables_legumes_estimate_from_ingredients_value: number;
    nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients: number;
    nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients_value: number;
    obsolete_imported: string;
    origins: string;
    origins_hierarchy: any[];
    origins_lc: string;
    origins_old: string;
    origins_tags: any[];
    other_nutritional_substances_tags: any[];
    owner: string;
    owner_fields: { [key: string]: number };
    owners_tags: string;
    packaging: string;
    packaging_hierarchy: string[];
    packaging_lc: string;
    packaging_materials_tags: string[];
    packaging_old: string;
    packaging_old_before_taxonomization: string;
    packaging_recycling_tags: any[];
    packaging_shapes_tags: any[];
    packaging_tags: string[];
    packagings: ProductPackaging[];
    packagings_materials: PackagingsMaterials;
    packagings_n: number;
    photographers_tags: string[];
    pnns_groups_1: string;
    pnns_groups_1_tags: string[];
    pnns_groups_2: string;
    pnns_groups_2_tags: string[];
    popularity_key: number;
    popularity_tags: string[];
    product_name: string;
    product_name_fr: string;
    product_name_fr_imported: string;
    product_quantity: string;
    purchase_places: string;
    purchase_places_debug_tags: any[];
    purchase_places_tags: string[];
    quantity: string;
    quantity_debug_tags: any[];
    quantity_imported: string;
    removed_countries_tags: any[];
    rev: number;
    scans_n: number;
    scores: Grades;
    selected_images: SelectedImages;
    serving_quantity: string;
    serving_size: string;
    serving_size_debug_tags: any[];
    serving_size_imported: string;
    sortkey: number;
    sources: Source[];
    sources_fields: SourcesFields;
    states: string;
    states_hierarchy: string[];
    states_tags: string[];
    stores: string;
    stores_tags: string[];
    teams: string;
    teams_tags: string[];
    traces: string;
    traces_from_ingredients: string;
    traces_from_user: string;
    traces_hierarchy: string[];
    traces_imported: string;
    traces_lc: string;
    traces_tags: string[];
    unique_scans_n: number;
    unknown_ingredients_n: number;
    unknown_nutrients_tags: any[];
    update_key: string;
    vitamins_prev_tags: string[];
    vitamins_tags: string[];
    weighers_tags: any[];
}

export interface CategoriesProperties {
    "agribalyse_proxy_food_code:en": string;
    "ciqual_food_code:en": string;
}

export interface CategoryProperties {
    "ciqual_food_name:en": string;
    "ciqual_food_name:fr": string;
}

export interface EcoscoreData {
    adjustments: Adjustments;
    agribalyse: Agribalyse;
    grade: EcoscoreGrade;
    grades: { [key: string]: EcoscoreGrade };
    missing: Missing;
    missing_data_warning: number;
    previous_data: PreviousData;
    score: number;
    scores: { [key: string]: number };
    status: string;
}

export interface Adjustments {
    origins_of_ingredients: OriginsOfIngredients;
    packaging: AdjustmentsPackaging;
    production_system: ProductionSystem;
    threatened_species: ThreatenedSpecies;
}

export interface OriginsOfIngredients {
    aggregated_origins: AggregatedOrigin[];
    epi_score: number;
    epi_value: number;
    origins_from_origins_field: string[];
    transportation_score: number;
    transportation_scores: { [key: string]: number };
    transportation_value: number;
    transportation_values: { [key: string]: number };
    value: number;
    values: { [key: string]: number };
    warning: string;
}

export interface AggregatedOrigin {
    epi_score: string;
    origin: string;
    percent: number;
    transportation_score: string;
}

export interface AdjustmentsPackaging {
    non_recyclable_and_non_biodegradable_materials: number;
    packagings: PackagingPackaging[];
    score: number;
    value: number;
    warning: string;
}

export interface PackagingPackaging {
    ecoscore_material_score: number;
    ecoscore_shape_ratio: number;
    material: string;
    non_recyclable_and_non_biodegradable?: FromPalmOil;
    shape: string;
}

export enum FromPalmOil {
    Maybe = "maybe",
    No = "no",
    Yes = "yes",
}

export interface ProductionSystem {
    labels: any[];
    value: number;
    warning: string;
}

export interface ThreatenedSpecies {
    ingredient: string;
    value: number;
}

export interface Agribalyse {
    agribalyse_proxy_food_code: string;
    co2_agriculture: number;
    co2_consumption: number;
    co2_distribution: number;
    co2_packaging: number;
    co2_processing: number;
    co2_total: number;
    co2_transportation: number;
    code: string;
    dqr: string;
    ef_agriculture: number;
    ef_consumption: number;
    ef_distribution: number;
    ef_packaging: number;
    ef_processing: number;
    ef_total: number;
    ef_transportation: number;
    is_beverage: number;
    name_en: string;
    name_fr: string;
    score: number;
    version?: string;
}

export enum EcoscoreGrade {
    E = "e",
}

export interface Missing {
    labels: number;
    origins: number;
    packagings: number;
}

export interface PreviousData {
    agribalyse: Agribalyse;
    grade: string;
    score: number;
}

export interface Grades {
}

export interface Images {
    "1": The1;
    "2": The1;
    "3": The1;
    "4": The1;
    "5": The1;
    "6": The1;
    "7": The10;
    "8": The10;
    "9": The10;
    "10": The10;
    "11": The10;
    "12": The10;
    "13": The10;
    "14": The10;
    "15": The1;
    "16": The1;
    "17": The1;
    "18": The1;
    "25": The1;
    "26": The1;
    "27": The1;
    "29": The1;
    "30": The1;
    "31": The1;
    "32": The1;
    "33": The1;
    "34": The1;
    "35": The1;
    "36": The1;
    "37": The1;
    "38": The1;
    "39": The1;
    "40": The1;
    "41": The1;
    front: ImagesFront;
    front_fr: Fr;
    ingredients: ImagesFront;
    ingredients_fr: Fr;
    nutrition: ImagesFront;
    nutrition_fr: Fr;
    packaging_fr: Fr;
}

export interface The1 {
    sizes: Sizes;
    uploaded_t: number;
    uploader: string;
}

export interface Sizes {
    "100": The100;
    "400": The100;
    full: The100;
    "200"?: The100;
}

export interface The100 {
    h: number;
    w: number;
}

export interface The10 {
    sizes: Sizes;
    uploaded_t: string;
    uploader: string;
}

export interface ImagesFront {
    geometry: string;
    imgid: string;
    normalize: string;
    rev: string;
    sizes: Sizes;
    white_magic: string;
    ocr?: number;
    orientation?: string;
}

export interface Fr {
    angle: number | null;
    coordinates_image_size?: string;
    geometry: string;
    imgid: string;
    normalize: null | string;
    rev: string;
    sizes: Sizes;
    white_magic: null | string;
    x1: null | string;
    x2: null | string;
    y1: null | string;
    y2: null | string;
    ocr?: number;
    orientation?: string;
}

export interface Ingredient {
    has_sub_ingredients?: FromPalmOil;
    id: string;
    percent?: number;
    percent_estimate: number;
    percent_max: number;
    percent_min: number;
    rank?: number;
    text: string;
    vegan?: FromPalmOil;
    vegetarian?: FromPalmOil;
    ciqual_food_code?: string;
    from_palm_oil?: FromPalmOil;
}

export interface IngredientsAnalysis {
    "en:non-vegan": string[];
    "en:palm-oil": string[];
    "en:vegan-status-unknown": string[];
    "en:vegetarian-status-unknown": string[];
}

export interface Languages {
    "en:french": number;
}

export interface LanguagesCodes {
    fr: number;
}

export interface NutrientLevels {
    fat: string;
    salt: string;
    "saturated-fat": string;
    sugars: string;
}

export interface Nutriments {
    carbohydrates: number;
    carbohydrates_100g: number;
    carbohydrates_serving: number;
    carbohydrates_unit: string;
    carbohydrates_value: number;
    "carbon-footprint-from-known-ingredients_100g": number;
    "carbon-footprint-from-known-ingredients_product": number;
    "carbon-footprint-from-known-ingredients_serving": number;
    energy: number;
    "energy-kcal": number;
    "energy-kcal_100g": number;
    "energy-kcal_serving": number;
    "energy-kcal_unit": string;
    "energy-kcal_value": number;
    "energy-kcal_value_computed": number;
    "energy-kj": number;
    "energy-kj_100g": number;
    "energy-kj_serving": number;
    "energy-kj_unit": string;
    "energy-kj_value": number;
    "energy-kj_value_computed": number;
    energy_100g: number;
    energy_serving: number;
    energy_unit: string;
    energy_value: number;
    fat: number;
    fat_100g: number;
    fat_serving: number;
    fat_unit: string;
    fat_value: number;
    fiber: number;
    fiber_100g: number;
    fiber_serving: number;
    fiber_unit: string;
    fiber_value: number;
    "fruits-vegetables-legumes-estimate-from-ingredients_100g": number;
    "fruits-vegetables-legumes-estimate-from-ingredients_serving": number;
    "fruits-vegetables-nuts-estimate-from-ingredients_100g": number;
    "fruits-vegetables-nuts-estimate-from-ingredients_serving": number;
    iron: number;
    iron_100g: number;
    iron_label: string;
    iron_serving: number;
    iron_unit: string;
    iron_value: number;
    "nova-group": number;
    "nova-group_100g": number;
    "nova-group_serving": number;
    "nutrition-score-fr": number;
    "nutrition-score-fr_100g": number;
    proteins: number;
    proteins_100g: number;
    proteins_serving: number;
    proteins_unit: string;
    proteins_value: number;
    salt: number;
    salt_100g: number;
    salt_serving: number;
    salt_unit: string;
    salt_value: number;
    "saturated-fat": number;
    "saturated-fat_100g": number;
    "saturated-fat_serving": number;
    "saturated-fat_unit": string;
    "saturated-fat_value": number;
    sodium: number;
    sodium_100g: number;
    sodium_serving: number;
    sodium_unit: string;
    sodium_value: number;
    sugars: number;
    sugars_100g: number;
    sugars_serving: number;
    sugars_unit: string;
    sugars_value: number;
    "vitamin-b1": number;
    "vitamin-b12": number;
    "vitamin-b12_100g": number;
    "vitamin-b12_label": string;
    "vitamin-b12_serving": number;
    "vitamin-b12_unit": string;
    "vitamin-b12_value": number;
    "vitamin-b1_100g": number;
    "vitamin-b1_label": string;
    "vitamin-b1_serving": number;
    "vitamin-b1_unit": string;
    "vitamin-b1_value": number;
    "vitamin-b2": number;
    "vitamin-b2_100g": number;
    "vitamin-b2_label": string;
    "vitamin-b2_serving": number;
    "vitamin-b2_unit": string;
    "vitamin-b2_value": number;
    "vitamin-b6": number;
    "vitamin-b6_100g": number;
    "vitamin-b6_label": string;
    "vitamin-b6_serving": number;
    "vitamin-b6_unit": string;
    "vitamin-b6_value": number;
    "vitamin-b9": number;
    "vitamin-b9_100g": number;
    "vitamin-b9_label": string;
    "vitamin-b9_serving": number;
    "vitamin-b9_unit": string;
    "vitamin-b9_value": number;
    "vitamin-pp": number;
    "vitamin-pp_100g": number;
    "vitamin-pp_label": string;
    "vitamin-pp_serving": number;
    "vitamin-pp_unit": string;
    "vitamin-pp_value": number;
}

export interface Nutriscore {
    category_available: number;
    data: Data;
    grade: string;
    nutrients_available: number;
    nutriscore_applicable: number;
    nutriscore_computed: number;
    score: number;
}

export interface Data {
    energy: number;
    energy_points: number;
    energy_value?: number;
    fiber: number;
    fiber_points: number;
    fiber_value?: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils?: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils_points?: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils_value?: number;
    is_beverage: number;
    is_cheese: number;
    is_fat?: number;
    is_water: number;
    negative_points: number;
    positive_points: number;
    proteins: number;
    proteins_points: number;
    proteins_value?: number;
    saturated_fat: number;
    saturated_fat_points: number;
    saturated_fat_value?: number;
    sodium?: number;
    sodium_points?: number;
    sodium_value?: number;
    sugars: number;
    sugars_points: number;
    sugars_value?: number;
    grade?: string;
    score?: number;
    count_proteins?: number;
    count_proteins_reason?: string;
    fruits_vegetables_legumes?: number;
    fruits_vegetables_legumes_points?: number;
    is_fat_oil_nuts_seeds?: number;
    negative_nutrients?: string[];
    positive_nutrients?: string[];
    salt?: number;
    salt_points?: number;
}

export interface NutriscoreData {
    energy: number;
    energy_points: number;
    energy_value: number;
    fiber: number;
    fiber_points: number;
    fiber_value: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils_points: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils_value: number;
    is_beverage: number;
    is_cheese: number;
    is_fat: number;
    is_water: number;
    negative_points: number;
    positive_points: number;
    proteins: number;
    proteins_points: number;
    proteins_value: number;
    saturated_fat: number;
    saturated_fat_points: number;
    saturated_fat_value: number;
    sodium: number;
    sodium_points: number;
    sodium_value: number;
    sugars: number;
    sugars_points: number;
    sugars_value: number;
    grade?: string;
    score?: number;
}

export interface ProductPackaging {
    material: string;
}

export interface PackagingsMaterials {
    all: Grades;
    "en:plastic": Grades;
    "en:unknown": Grades;
}

export interface SelectedImages {
    front: PackagingClass;
    ingredients: PackagingClass;
    nutrition: PackagingClass;
    packaging: PackagingClass;
}

export interface PackagingClass {
    display: Display;
    small: Display;
    thumb: Display;
}

export interface Display {
    fr: string;
}

export interface Source {
    fields: string[];
    id: string;
    images: any[];
    import_t: number;
    manufacturer: number;
    name: string;
    url: null;
}

export interface SourcesFields {
    "org-gs1": OrgGs1;
}

export interface OrgGs1 {
    gln: string;
    gpcCategoryCode: string;
    isAllergenRelevantDataProvided: string;
    lastChangeDateTime: Date;
    partyName: string;
}
