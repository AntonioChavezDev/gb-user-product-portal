import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Abstract base service for HTTP requests.
 * Extend this class for entity-specific services.
 */
export abstract class AbstractRestHttpService<T> {
  protected constructor(
    protected http: HttpClient,
    protected baseUrl: string
  ) {}
  
  /**
   * Get all entities.
   */
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  /**
   * Get entity by ID.
   * @param id Entity identifier
   */
  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  /**
   * Create a new entity.
   * @param item Entity data
   */
  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  /**
   * Update an entity.
   * @param id Entity identifier
   * @param item Updated entity data
   */
  update(id: string | number, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item);
  }

  /**
   * Delete an entity.
   * @param id Entity identifier
   */
  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
