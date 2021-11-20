import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ItemsList from '../ItemsList';
import Item from '../Item';

const ItemsSection = ({ items }) => {
    const [organizableItems, setOrganizableItems] = useState(items);

    useEffect(() => {
        setOrganizableItems(items);
    }, [items]);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (
            !destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)
        ) {
            return;
        }

        const draggedItem = organizableItems.find(
            ({ squareId }) => squareId === draggableId,
        );

        const updatedOrganizableItems = [...organizableItems];
        updatedOrganizableItems.splice(source.index, 1);
        updatedOrganizableItems.splice(destination.index, 0, draggedItem);

        setOrganizableItems(updatedOrganizableItems);
    };

    return (
        <section>
            <h1>title</h1>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="1">
                    {(provided) => (
                        <ItemsList innerRef={provided.innerRef}>
                            {organizableItems.map(
                                ({ name, squareId }, index) => (
                                    <Item
                                        key={squareId}
                                        name={name}
                                        id={squareId}
                                        index={index}
                                    />
                                ),
                            )}
                            {provided.placeholder}
                        </ItemsList>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    );
};

ItemsSection.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItemsSection;
