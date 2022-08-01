const migrationFunction = (migration, context) => {
    migration.transformEntries({
        contentType: 'socialMedia',
        from: ['link', 'origin'],
        to: ['link'],
        transformEntryForLocale: function (fromFields, currentLocale) {
            let newLink = ''
            try {
                new URL(fromFields.link[currentLocale]);
                newLink = fromFields.link[currentLocale];
            } catch(err) {
                const link = fromFields.link[currentLocale];
                switch(fromFields.origin[currentLocale]) {
                    case "twitter": {
                        newLink = `https://twitter.com/u/status/${link}`
                        break;
                    }
                    case "youtube": {
                        newLink = `https://www.youtube.com/embed/${link}`
                        break;
                    }
                    default: { 
                        newLink = fromFields.link[currentLocale];
                    }
                }
            }
            return { link: newLink }
        }
    });
}

module.exports = migrationFunction;