import { ToyBrick, Calendar1, Hash } from "lucide-react";

function CollectionItem({ set }) {
return (
        <div className="border-2 rounded-lg overflow-hidden p-2">
            <div className="w-full h-50 flex items-center justify-center">
              <img
                src={set.setImgUrl}
                alt={set.name}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex flex-col text-center gap-2">
                <h3 className="">{set.name}</h3>
                <div className="flex gap-2 justify-center">
                    <div className="flex flex-row">
                        <Hash className="p-1"/>
                        <p>{set.setNum}</p>
                    </div>
                    <div className="flex">
                        <ToyBrick className="p-1"/>
                        <p>{set.numParts}</p>
                    </div>
                    <div className="flex flex-row">
                        <Calendar1 className="p-1"/>
                        <p>{set.year}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionItem;