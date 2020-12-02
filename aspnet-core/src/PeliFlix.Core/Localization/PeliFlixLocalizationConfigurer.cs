using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace PeliFlix.Localization
{
    public static class PeliFlixLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(PeliFlixConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(PeliFlixLocalizationConfigurer).GetAssembly(),
                        "PeliFlix.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
