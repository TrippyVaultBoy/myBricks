import { useMyBricksContext } from "./ContextProvider";

import CollectionItem from "./CollectionItem";

function Collection() {
    const { collection } = useMyBricksContext();
    
    return (
        <div className="px-4 py-6">
            <h2>User123's Collection:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {collection.map((set) => (
                    <CollectionItem key={set.setNum} set={set}/>
                ))}
            </div>
        </div>
    )
};

export default Collection;