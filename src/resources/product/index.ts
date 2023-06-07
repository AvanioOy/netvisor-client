import getProductList from './getProductList';

export enum InventoryBatchLinkingMode {
	NoBatchProcessing = 1,
	ManualBatchSelection = 2,
	NewestFirstByDeliveryDate = 3,
	OldestFirstByDeliveryDate = 4,
	NewestFirstByUseByDate = 5,
	OldestFirstByUseByDate = 6,
	NewestFirstByManufacturingDate = 7,
	OldestFirstByManufacturingDate = 8,
}

export default {getProductList};
