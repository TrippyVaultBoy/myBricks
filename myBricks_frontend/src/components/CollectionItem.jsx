function CollectionItem({ set }) {
return (
        <div className="border rounded-lg overflow-hidden p-2">
            <div className="w-full h-50 flex items-center justify-center">
              <img
                src={set.setImgUrl}
                alt={set.name}
                className="object-contain w-full h-full"
              />
            </div>
            <h3>{set.name}</h3>
            <div className="flex flex-col">
                <p>Pieces: {set.numParts}</p>
                <p>Year: {set.year}</p>
                <p>Quantity: {set.quantity}</p>
            </div>
        </div>
    )
}

export default CollectionItem;