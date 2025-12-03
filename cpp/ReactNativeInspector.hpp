#include "HybridInspectorSpec.hpp"
#include <IOSInspector/Inspector.h>

namespace margelo::nitro::pakerwreah_reactnativeinspector {

  struct DatabaseProviderImpl: public DatabaseProvider {

    std::vector<std::string> paths;

    std::vector<std::string> databasePathList() const override {
      return paths;
    }
  };

  class ReactNativeInspector: public HybridInspectorSpec, public Inspector {

    std::shared_ptr<DatabaseProviderImpl> databaseProvider;

    explicit ReactNativeInspector(std::shared_ptr<DatabaseProviderImpl> provider)
        : HybridObject(TAG)
        , Inspector(provider, {})
        , databaseProvider(provider)
    {
      this->bind(30000);
    }

  public:
    ReactNativeInspector(): ReactNativeInspector(std::make_shared<DatabaseProviderImpl>()) { }

    void setDatabasePaths(const std::vector<std::string>& paths) override;
    void createDatabase(const std::string& path) override;
    auto query(const std::string &path, const std::string& sql) -> std::optional<Result> override;
  };
}
