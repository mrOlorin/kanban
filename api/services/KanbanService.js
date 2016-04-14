module.exports = {
    getTemplates: function () {
        return [
            {
                type: 'item',
                name: 'Card',
                text: 'New card'
            },
            {
                type: 'container',
                name: 'List',
                text: 'New list',
                items: [[]]
            }
        ];
    },
    getInitialKanban: function () {
        return {
            selected: null,
            dropzones: {
                'Dropzone': [
                    {
                        'type': 'item',
                        'text': 'Card 1'
                    },
                    {
                        'type': 'item',
                        'text': 'Card 2'
                    },
                    {
                        'type': 'container',
                        'text': 'List 1',
                        'items': [
                            [
                                {
                                    'type': 'item',
                                    'text': 'Card 3'
                                },
                                {
                                    'type': 'item',
                                    'text': 'Card 4'
                                },
                                {
                                    'type': 'item',
                                    'text': 'Card 5'
                                }
                            ]
                        ]
                    },
                    {
                        'type': 'item',
                        'text': 'Card 6'
                    }
                ]
            }
        };
    }
};

