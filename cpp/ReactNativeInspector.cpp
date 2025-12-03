#include "ReactNativeInspector.hpp"
#include <IOSInspector/util.h>

namespace margelo::nitro::pakerwreah_reactnativeinspector {

using nlohmann::json;

void ReactNativeInspector::setDatabasePaths(const std::vector<std::string>& paths)  {
  databaseProvider->paths = paths;
}

void ReactNativeInspector::createDatabase(const std::string& path) {
  try {
    Database(path, "", 0, true);
  } catch(std::exception ex) {
    std::cerr << ex.what() << std::endl;
  }
}

auto ReactNativeInspector::query(const std::string &path, const std::string& sql) -> std::optional<Result> {
  try {
    auto db = Database(path);

    auto start = util::timestamp();

    auto res = db.query(sql);

    auto duration = util::benchmark(start);

    Result result;

    result.headers = res.headers();

    auto cols = result.headers.size();

    while (res.next()) {
      decltype(result.data)::value_type row;

      for (int i = 0; i < cols; i++) {
        switch (res.type(i)) {
          case SQLITE_INTEGER:
            row.emplace_back(double(res.integer(i)));
            break;
          case SQLITE_FLOAT:
            row.emplace_back(res.decimal(i));
            break;
          case SQLITE_NULL:
            row.emplace_back(nullptr);
            break;
          default:
            row.emplace_back(res.text(i));
            break;
        }
      }
      result.data.push_back(row);
    }

    return result;
  } catch (const exception &ex) {
    std::cerr << ex.what() << std::endl;
    return std::nullopt;
  }
}

} // namespace
