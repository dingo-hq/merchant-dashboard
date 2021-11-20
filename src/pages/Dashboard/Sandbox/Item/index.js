import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

const Item = ({ name, id, index }) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {name}
                </li>
            )}
        </Draggable>
    );
};

Item.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Item;
